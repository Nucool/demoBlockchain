pragma solidity 0.4.21;
import "./ERC20.sol";
import "./Ownable.sol";
import "./SafeMath.sol";


contract MemberInterface {
  function getMemberInternal(address _address) external view returns (string name, string telephone);
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

  function _setPriceTicketByOwner(address _owner, uint _price) private {
    for (uint i = 0; i < tickets.length; i++) {
      if (ticketToOwner[i] == _owner) {
        tickets[i].price = _price;
      }
    }
  }

  function setPriceTicketsByOwner(uint _price) public {
    require(_price > 0);
    _setPriceTicketByOwner(msg.sender, _price);
  }

  function getTicketsByOwner(address _owner) view returns(uint[] prices,uint totalTicket, string ownerName, string ownerTelephone) {
    uint[] memory result = new uint[](ownerTicketCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < tickets.length; i++) {
      if (ticketToOwner[i] == _owner) {
        result[counter] = tickets[i].price;
        counter++;
      }
    }

    string memberName;
    (memberName, ) = memberContract.getMemberInternal(_owner);
    return (result, ownerTicketCount[_owner], "", "");
  }

  function _buyTicket(address _ownerTicket, address _newOwnerTicket, uint _amount) private {
    uint price;
    uint counter = 0;
    for (uint i = 0; i < tickets.length; i++) {
      if (ticketToOwner[i] == _ownerTicket && counter < _amount) {
        ticketToOwner[i] = _newOwnerTicket;
        price = tickets[i].price;
        counter++;
      }
    }

    ownerTicketCount[_ownerTicket] = ownerTicketCount[_ownerTicket].sub(_amount);
    ownerTicketCount[_newOwnerTicket] = ownerTicketCount[_newOwnerTicket].add(_amount);
    _ownerTicket.transfer(_amount * price);
  }

  function buyTicket(address _ownerTicket, uint _amount) public payable {
    uint[] memory prices = new uint[](ownerTicketCount[_ownerTicket]);
    uint totalTicket;
    (prices,totalTicket,,) = getTicketsByOwner(_ownerTicket);
    require(totalTicket > 0);

    return _buyTicket(_ownerTicket, msg.sender, _amount);
  }


  function setMemberContractAddress(address _address) public {
    memberContract = MemberInterface(_address);
  }

}
