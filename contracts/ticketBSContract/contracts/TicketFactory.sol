pragma solidity ^0.4.21;
import "./ERC20.sol";
import "./Ownable.sol";
import "./SafeMath.sol";


contract MemberInterface {
  function getMemberInternal(address _address) external view returns (bytes32 name, bytes32 telephone);
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

  function TicketFactory() public {
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

  function getTicketsByOwner(address _owner) view public returns(uint prices,uint totalTicket, string ownerName, string ownerTelephone) {
    uint price = 0;
    for (uint i = 0; i < tickets.length; i++) {
      if (ticketToOwner[i] == _owner) {
        price = tickets[i].price;
        break;
      }
    }

    bytes32 memberName;
    bytes32 memberTelephone;
    (memberName, memberTelephone) = memberContract.getMemberInternal(_owner);
    return (price, ownerTicketCount[_owner], bytes32ToString(memberName), bytes32ToString(memberTelephone));
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
    uint totalTicket;
    (,totalTicket,,) = getTicketsByOwner(_ownerTicket);
    require(totalTicket > 0);

    return _buyTicket(_ownerTicket, msg.sender, _amount);
  }


  function setMemberContractAddress(address _address) public {
    memberContract = MemberInterface(_address);
  }

  function bytes32ToString(bytes32 x) public pure returns (string) {
    bytes memory bytesString = new bytes(32);
    uint charCount = 0;
    for (uint j = 0; j < 32; j++) {
        byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
        if (char != 0) {
            bytesString[charCount] = char;
            charCount++;
        }
    }
    bytes memory bytesStringTrimmed = new bytes(charCount);
    for (j = 0; j < charCount; j++) {
        bytesStringTrimmed[j] = bytesString[j];
    }
    return string(bytesStringTrimmed);
}

}
