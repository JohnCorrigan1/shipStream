//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// import "./SafeMath.sol";

// Useful for debugging. Remove when deploying to a live network.
// import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ShipStream {
  using SafeMath for uint256;
  struct Stream {
    string name;
    uint256 duration;
    uint256 frequency;
    uint256 startTime;
    uint256 endTime;
    uint256 startBalance;
    uint256 currentBalance;
    string[] uploads;
    uint256 streamed;
    uint256 totalStreams;
  }

  address public immutable owner;
  uint256 public totalStreams;
  mapping(address => Stream[]) public streams;

  event StreamCreated(address indexed streamCreator, uint256 duration, uint256 frequency);
  event StringUploaded(address indexed streamCreator, uint256 stream, string upload);

  constructor(address _owner) {
    owner = _owner;
  }

  // Modifier: used to define a set of rules that must be met before or after a function is executed
  // Check the withdraw() function
  modifier isOwner() {
    // msg.sender: predefined variable that represents address of the account that called the current function
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  function createStream(uint256 duration, uint256 frequency, string memory name) public payable {
    require(msg.value > 0, "Must send ether to create a stream");
    require(duration > 0, "Duration must be greater than 0");
    require(frequency > 0, "Frequency must be greater than 0");
    require(duration > frequency, "Duration must be greater than frequency");
    require(duration % frequency == 0, "Duration must be divisible by frequency");

    Stream memory stream = Stream(
      name,
      duration,
      frequency,
      block.timestamp,
      block.timestamp + duration,
      msg.value,
      msg.value,
      new string[](0),
      0,
      duration / frequency
    );

    streams[msg.sender].push(stream);
    totalStreams += 1;
    emit StreamCreated(msg.sender, duration, frequency);
  }

  function uploadString(string memory _upload, uint _index) public {
    require(streams[msg.sender][_index].endTime > block.timestamp, "Stream has ended");
    require(streams[msg.sender][_index].currentBalance > 0, "Stream has no balance");
    require(streams[msg.sender][_index].streamed < streams[msg.sender][_index].totalStreams, "Stream has ended");

    require(
      ((block.timestamp.sub(streams[msg.sender][_index].startTime))) / (streams[msg.sender][_index].frequency) >=
        streams[msg.sender][_index].streamed ||
        streams[msg.sender][_index].streamed == 0,
      "wait"
    );

    require(
      ((block.timestamp.sub(streams[msg.sender][_index].startTime)).mul(10 ** 18)).div(
        streams[msg.sender][_index].frequency.mul(10 ** 18)
      ) < (streams[msg.sender][_index].streamed.add(1)),
      "missed"
    );
    //push string add to streams
    streams[msg.sender][_index].uploads.push(_upload);
    // streams[msg.sender][_index].uploads.push({upload: _upload, timestamp: block.timestamp});
    streams[msg.sender][_index].streamed += 1;
    //subtract from bal
    streams[msg.sender][_index].currentBalance -=
      streams[msg.sender][_index].startBalance /
      streams[msg.sender][_index].totalStreams;

    //send subtracted balance to msg.sender
    payable(msg.sender).transfer(streams[msg.sender][_index].startBalance / streams[msg.sender][_index].totalStreams);
    emit StringUploaded(msg.sender, _index, _upload);
  }

  function closeStream(address _user, uint _index) public {
    //if they missed a stream
    require(isCloseable(_user, _index), "Stream still open");

    //send 10% of current balance to msg.sender rest goes to public goods aka me im good no cap
    (bool callerSuccess, ) = msg.sender.call{value: streams[_user][_index].currentBalance / 10}("");
    require(callerSuccess, "Transfer failed.");
    (bool goodsSuccess, ) = msg.sender.call{value: (streams[_user][_index].currentBalance / 10) * 9}("");
    require(goodsSuccess, "Transfer failed.");

    //remove stream from array of streams
    totalStreams -= 1;
    for (uint i = _index; i < streams[_user].length - 1; i++) {
      streams[_user][i] = streams[_user][i + 1];
    }
    streams[_user].pop();
  }

  //helper function to check if stream is closeable
  // function isCloseable(address _user, uint _index) public view returns (bool) {
  //   return ((streams[_user][_index].streamed * streams[_user][_index].frequency) +
  //     (streams[_user][_index].startTime * 1000) +
  //     streams[_user][_index].frequency <
  //     block.timestamp * 1000);
  // }

  function isCloseable(address user, uint index) public view returns (bool) {
    return ((streams[user][index].streamed * streams[user][index].frequency) + streams[user][index].startTime <
      block.timestamp);
  }

  function withdraw() public isOwner {}

  //address' balance of all their streams
  function balanceOf(address user) public view returns (uint256) {
    uint256 balance = 0;
    for (uint256 i = 0; i < streams[user].length; i++) {
      balance += streams[user][i].currentBalance;
    }
    return balance;
  }

  //number of open streams of an address
  function numStreams(address user) public view returns (uint256) {
    return streams[user].length;
  }

  //returns specific stream of an address
  function streamOf(address user, uint stream) public view returns (Stream memory) {
    return streams[user][stream];
  }

  //returns all streams of an address
  function streamsOf(address user) public view returns (Stream[] memory) {
    return streams[user];
  }

  //number of streams streamed of an address
  function streamedOf(address user, uint stream) public view returns (uint256) {
    return streams[user][stream].streamed;
  }

  function totalStreamsOf(address user, uint stream) public view returns (uint256) {
    return streams[user][stream].totalStreams;
  }

  //last upload of a specific stream of an address
  function lastUploadOf(address user, uint stream) public view returns (string memory) {
    return streams[user][stream].uploads[streams[user][stream].uploads.length - 1];
  }

  //returns all uploads of a specific stream of an address
  function uploadsOf(address user, uint stream) public view returns (string[] memory) {
    return streams[user][stream].uploads;
  }

  receive() external payable {}
}
