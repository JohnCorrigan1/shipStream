//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
// import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

contract ShipStream {
  // State Variables
  address public immutable owner;

  // Events: a way to emit log statements from smart contract that can be listened to by external parties
  //   event GreetingChange(address indexed greetingSetter, string newGreeting, bool premium, uint256 value);

  // Constructor: Called once on contract deployment
  // Check packages/hardhat/deploy/00_deploy_your_contract.ts
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

  receive() external payable {}
}
