const Web3 = require('web3');
const TruffleConfig = require('../truffle');
var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer, network) {
  const config = TruffleConfig.networks[network];
  console.log('con')
  const web3 = new Web3(new Web3.providers.HttpProvider('http://' + config.host + ':' + config.port));
  console.log('web3.personal', web3.personal)
  web3.eth.personal.unlockAccount(config.from, '11111111', 0);
  deployer.deploy(Migrations);
};
