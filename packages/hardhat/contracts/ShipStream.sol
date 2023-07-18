//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// import "@openzeppelin/contracts/access/Ownable.sol";

contract ShipStream {

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

   struct CloseableStream {
     address user;
     uint index;
   }

  struct CloseableDistribution {
    uint256 publicGoods;
    uint256 closer;
  }

  address public immutable owner;
  uint256 public totalStreams;
  mapping(address => Stream[]) public streams;
  address[] public users;
  address public publicGoods = 0xDFaD36565B8753e9D2b0bdCbaF652C17f7733047;

  event StreamCreated(address indexed streamCreator, uint256 duration, uint256 frequency);
  event StringUploaded(address indexed streamCreator, uint256 stream, string upload);

  constructor(address _owner) {
    owner = _owner;
  }

  modifier isOwner() {
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

    if(streams[msg.sender].length == 0) {
      users.push(msg.sender);
    }

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

   require((block.timestamp - streams[msg.sender][_index].startTime) / streams[msg.sender][_index].frequency <
      streams[msg.sender][_index].streamed + 1, "missed");
    //push string add to streams
    streams[msg.sender][_index].uploads.push(_upload);
    streams[msg.sender][_index].streamed += 1;
    //subtract from bal
    streams[msg.sender][_index].currentBalance -=
    streams[msg.sender][_index].startBalance /
    streams[msg.sender][_index].totalStreams;

    //send subtracted balance to msg.sender
    payable(msg.sender).transfer(streams[msg.sender][_index].startBalance / streams[msg.sender][_index].totalStreams);

    if (streams[msg.sender][_index].streamed == streams[msg.sender][_index].totalStreams) {
      closeStream(msg.sender, _index);
    }

    emit StringUploaded(msg.sender, _index, _upload);
  }

  function closeStream(address _user, uint _index) public {
    //if they missed a stream
    require(isCloseable(_user, _index), "Stream still open");

    //send 10% of current balance to msg.sender rest goes to public goods aka me im good no cap
    (bool callerSuccess, ) = msg.sender.call{value: streams[_user][_index].currentBalance / 10}("");
    require(callerSuccess, "Transfer failed.");
    (bool goodsSuccess, ) = publicGoods.call{value: (streams[_user][_index].currentBalance / 10) * 9}("");
    require(goodsSuccess, "Transfer failed.");

    //remove stream from array of streams
    totalStreams -= 1;
    for (uint i = _index; i < streams[_user].length - 1; i++) {
      streams[_user][i] = streams[_user][i + 1];
    }
    streams[_user].pop();

    //if last stream remove user from users array
    if (streams[_user].length == 0) {
      for (uint i = 0; i < users.length - 1; i++) {
        if (users[i] == _user) {
          users[i] = users[users.length - 1];
          break;
        }
      }
      users.pop();
    }
  }

  function isCloseable(address user, uint index) public view returns (bool) {
    return ((streams[user][index].streamed * streams[user][index].frequency) + streams[user][index].startTime <
      block.timestamp ||
      streams[user][index].streamed == streams[user][index].totalStreams);
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

  function getUsers() public view returns (address[] memory) {
    return users;
  }

  function numCloseableStreams() public view returns (uint256) {
    uint256 count = 0;
    for (uint256 i = 0; i < users.length; i++) {
      for (uint256 j = 0; j < streams[users[i]].length; j++) {
        if (isCloseable(users[i], j)) {
          count++;
        }
      }
    }
    return count;
  }

  function closeableStreams() public view returns (CloseableStream[] memory) {
    CloseableStream[] memory closeable = new CloseableStream[](numCloseableStreams());
    uint256 count = 0;
    for (uint256 i = 0; i < users.length; i++) {
      for (uint256 j = 0; j < streams[users[i]].length; j++) {
        if (isCloseable(users[i], j)) {
          closeable[count] = CloseableStream(users[i], j);
          count++;
        }
      }
    }
    return closeable;
  }

  function closeableStreamsDistribution() public view returns (CloseableDistribution memory) {
    CloseableDistribution memory distribution;
    CloseableStream[] memory closeable = closeableStreams();
    for (uint256 i = 0; i < closeable.length; i++) {
      distribution.publicGoods += (streams[closeable[i].user][closeable[i].index].currentBalance / 10) * 9;
      distribution.closer += streams[closeable[i].user][closeable[i].index].currentBalance / 10;
    }
    return distribution;
  }

  function closeAllCloseableStreams() public {
    CloseableStream[] memory closeable = closeableStreams();
    for (uint256 i = 0; i < closeable.length; i++) {
      closeStream(closeable[i].user, closeable[i].index);
    }
  }

  receive() external payable {}
}
