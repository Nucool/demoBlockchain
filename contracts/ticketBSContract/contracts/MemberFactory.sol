pragma solidity 0.4.21;

contract MemberFactory {

  event NewMember(string name, string telephone);

  struct Member {
    string name;
    string telephone;
  }

  mapping (address => Member) members;
  address[] public memberAccounts;

  function _createMember(string _name, string _telephone, address _address) internal {
    Member storage member = members[_address];
    member.name = _name;
    member.telephone = _telephone;
    memberAccounts.push(_address);
    emit NewMember(_name, _telephone);
  }

  function getMember(address _address) view public returns (string name, string telephone) {
    return (members[_address].name, members[_address].telephone);
  }

  function getMemberInternal(address _address) external view returns (string name, string telephone) {
    Member memory member = members[_address];
    return (member.name, member.telephone);
  }

  function createMember(string _name, string _telephone, address _address) public {
    _createMember(_name, _telephone, _address);
  }

}
