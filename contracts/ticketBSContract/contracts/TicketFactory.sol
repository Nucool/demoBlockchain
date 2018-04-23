pragma solidity 0.4.21;
import "./ERC20.sol";
import "./Ownable.sol";
import "./SafeMath.sol";


contract MemberInterface {
  function getMember(address _address) view public returns (string, string);
}

contract TicketFactory is Ownable {
  using SafeMath for uint;

  MemberInterface memberContract;

  string public symbol;
  string public name;
  uint8 public decimals;
  uint initTotalTicket = 20;

  struct Ticket {
    uint price;
  }

  Ticket[] public tickets;

  mapping (uint => address) public ticketToOwner;
  mapping (address => uint) ownerTicketCount;

  modifier onlyOwnerOf(uint _ticketId) {
    require(msg.sender == ticketToOwner[_ticketId]);
    _;
  }

  function TicketFactory() {
    symbol = "TK";
    name = "Ticket";

    for(uint i = 0; i < initTotalTicket; i++){
      uint id = tickets.push(Ticket(1)) - 1;
      ticketToOwner[id] = msg.sender;
      ownerTicketCount[msg.sender] = ownerTicketCount[msg.sender].add(1);
    }
  }

  function _setPriceTicketByOwner(address _owner, uint price) private {
    for (uint i = 0; i < tickets.length; i++) {
      if (ticketToOwner[i] == _owner) {
        tickets[i].price = price;
      }
    }
  }

  function setPriceTicketsByOwner(uint price) public onlyOwner {
    require(price > 0);
    _setPriceTicketByOwner(msg.sender, price);
  }

  function getTicketsByOwner(address _owner) view returns(uint[] prices, string ownerName, string ownerTelephone) {
    uint[] memory result = new uint[](ownerTicketCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < tickets.length; i++) {
      if (ticketToOwner[i] == _owner) {
        result[counter] = tickets[i].price;
        counter++;
      }
    }
    return (result, "", "");
  }

}
