var Member = artifacts.require("./MemberFactory.sol");
var Ticket = artifacts.require("./TicketFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(Member);
  deployer.deploy(Ticket);
};
