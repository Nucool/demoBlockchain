pragma solidity 0.4.21;

contract MemberFactory {

  event NewMember(string name, string telephone);

  struct Member {
    string name;
    string telephone;
  }

  mapping (address => Member) members;
  address[] public memberAccounts;

  function _createMember(string _name, string _telephone) internal {
    Member storage member = members[msg.sender];
    member.name = _name;
    member.telephone = _telephone;
    memberAccounts.push(msg.sender);
    emit NewMember(_name, _telephone);
  }

  function getMember(address _address) view public returns (string, string) {
    return (members[_address].name, members[_address].telephone);
  }

  function createMember(string _name, string _telephone) public {
    require(memberAccounts[uint(msg.sender)] != msg.sender);
    _createMember(_name, _telephone);
  }

}
