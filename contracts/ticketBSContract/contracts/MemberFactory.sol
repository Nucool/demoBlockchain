pragma solidity ^0.4.21;

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

  function getMemberInternal(address _address) external view returns (bytes32 name, bytes32 telephone) {
    Member memory member = members[_address];
    bytes32 _name = stringToBytes32(member.name);
    bytes32 _telephone = stringToBytes32(member.telephone);
    return (_name, _telephone);
  }

  function createMember(string _name, string _telephone, address _address) public {
    _createMember(_name, _telephone, _address);
  }

  function stringToBytes32(string memory source) public pure returns (bytes32 result) {
    assembly {
      result := mload(add(source, 32))
    }
  }

}
