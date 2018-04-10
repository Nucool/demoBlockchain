pragma solidity ^0.4.17;

contract Ticket {
  address owner;
  uint tickets;
  uint constant price = 1 ether;
  mapping(address => uint) public purchasers;
  event BuyTickets(address indexed _sender, address _owner, uint256 _value, uint _amount);

  function Ticket() public {
    owner = msg.sender;
    tickets = 10;
  }

  function getTicketsTotal() public view returns (uint) {
    return tickets;
  }

  function buyTickets(uint amount) public payable {
    emit BuyTickets(msg.sender, owner, msg.value, amount);
    require(msg.value != (amount * price) || amount > tickets);

    purchasers[msg.sender] += amount;
    tickets -= amount;
    msg.sender.transfer(msg.value);
  }
}
