const Web3 = require('web3')
const contracttruff = require('truffle-contract')
const ticket_artifacts = require('../../../contracts/ticketContract/build/contracts/Ticket.json')
const member_artifacts = require('../../../contracts/ticketBSContract/build/contracts/MemberFactory.json')
const ticketBS_artifacts = require('../../../contracts/ticketBSContract/build/contracts/TicketFactory.json')

const isTestRPC = false;


let web3 = new Web3()
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

var contract = contracttruff(ticket_artifacts);
var contractTicket = contracttruff(ticketBS_artifacts);
var contractMember = contracttruff(member_artifacts);

contract.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
if (typeof contract.currentProvider.sendAsync !== "function") {
  contract.currentProvider.sendAsync = function() {
    return contract.currentProvider.send.apply(
      contract.currentProvider, arguments
    );
  };
}

contractTicket.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
if (typeof contractTicket.currentProvider.sendAsync !== "function") {
  contractTicket.currentProvider.sendAsync = function() {
    return contractTicket.currentProvider.send.apply(
      contractTicket.currentProvider, arguments
    );
  };
}

contractMember.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
if (typeof contractMember.currentProvider.sendAsync !== "function") {
  contractMember.currentProvider.sendAsync = function() {
    return contractMember.currentProvider.send.apply(
      contractMember.currentProvider, arguments
    );
  };
}


var account
var allEvents
var metaContract, metaMemberContract, metaTicketContract;
var accTestRPCAdmin = '';
/*contract.deployed().then(function(deployed) {
metaContract = deployed

allEvents = metaContract.allEvents(function(error, result){
if (!error)
{
console.log('args', result.args);
console.log('args.object', result.args._sender);
}
else {
console.log('error events', error)
}
})
metaContract.contract._eth.getAccounts(function (error, accounts) {
account = accounts[0]
console.log('account', account)
})
})*/

console.log('contractMember', contractMember)
contractMember.deployed().then(async function(deployed) {
  console.log('contractMember')
  metaMemberContract = deployed;

  let accTestRPC = await web3.eth.getAccounts()
  console.log('accTestRPC',accTestRPC)
  accTestRPCAdmin = accTestRPC[0]
  if(!isTestRPC){
    await unlockAccount(accTestRPCAdmin)
  }

  contractTicket.deployed().then(function(deployed) {
    metaTicketContract = deployed;
    console.log('contractTicket', metaTicketContract.address)
    metaTicketContract.setMemberContractAddress(metaMemberContract.address, { from: accTestRPCAdmin })
  })
})



const ethPersonal = web3.eth.personal

const getAccountBalance = async () => {
  let accountBalance = []
  let accounts = []

  /// start env TestRPC
  if(isTestRPC) {
    accounts.push(accTestRPCAdmin)
  }
  /// end env TestRPC

  let accountsPivate = await ethPersonal.getAccounts()
  for (let index in accountsPivate) {
    console.log('acc', accountsPivate[index])
    unlockAccount(accountsPivate[index])
    accounts.push(accountsPivate[index])
  }

  for (let index in accounts) {
    let account = accounts[index]
    let balance = await web3.eth.getBalance(account)
    let memberInfo = await metaMemberContract.getMember.call(account)
    let ownerTicket = await metaTicketContract.getTicketsByOwner.call(account, {from: account, gas:3000000});
    accountBalance.push({
      name: (memberInfo[0] === '' && isTestRPC ? 'Admin' : memberInfo[0]),//'account ' + (parseInt(index)+1),
      telephone: memberInfo[1],
      address: account,
      eth: web3.utils.fromWei(balance),
      ownerTicket: ownerTicket[1],
      ownerTicketPrice: ownerTicket[0]
    })
  }
  return accountBalance
}

const unlockAccount = async (address) => {
  let responseUnlock = await ethPersonal.unlockAccount(address, "11111111", 600)
  console.log('responseUnlock', responseUnlock)
}

var appRouter = function (app) {
  app.get("/account", async function (req, res) {
    let data = await getAccountBalance()
    res.status(200).send(data)
  });

  app.post("/account/transfer", async function (req, res) {
    console.log(req.body)
    if(req.body.from !== accTestRPCAdmin){
      await unlockAccount(req.body.from)
    }

    web3.eth.sendTransaction({from: req.body.from, to: req.body.to, value: web3.utils.toWei(req.body.eth, 'ether')})
    .then((response) => {
      console.log('sent transaction', response)
      res.status(200).send(req.body);
    })
  });

  app.post("/account/create", async function (req, res) {
    let newAccount = await ethPersonal.newAccount('11111111')
    let name = req.body.name
    let telephone = req.body.telephone
    await unlockAccount(newAccount);
    let response = await metaMemberContract.createMember(name, telephone, newAccount, {from: accTestRPCAdmin, gas:3000000 })
    console.log('newAccount', newAccount)

    let data = await getAccountBalance()
    res.status(200).send(data);
  })

  app.get("/account/:account", async function (req, res) {
    let account = req.params.account
    let memberInfo = await metaMemberContract.getMember.call(account, {from: account})

    let data = ({
      member: memberInfo
    });

    res.status(200).send(data);
  })

  app.get("/ticket/:account", async function (req, res) {
    console.log('buyticket')
    let account = req.params.account
    let response = await metaTicketContract.getTicketsByOwner.call(account, {from: account, gas:3000000});
    console.log('response', response)
    console.log('data', response[0][0]);

    let data = ({
      price: response[0],
      ownerTicket: response[1],
      ownerName: response[2],
      ownerTelephone: response[3]
    });
    res.status(200).send(data);
  })

  app.post("/setPriceTicket" , async function (req, res) {
    let price = req.body.price
    let account = req.body.account

    console.log('setTicket')
    let response = await metaTicketContract.setPriceTicketsByOwner(price, {from: account, gas:3000000});
    console.log('response', response)

    let data = ({
      ticketTotal: true
    });
    res.status(200).send(data);
  })

  app.post("/buyTicketFactory", async function (req, res) {

    let seller = req.body.seller
    let buyer = req.body.buyer
    let total = req.body.total
    let price = req.body.price
    let priceTotal = total * price
    let response = await metaTicketContract.buyTicket(seller, total,
      {from: buyer, value: web3.utils.toWei(priceTotal.toString(), 'ether'), gas:3000000});

      let data = ({
        success: true
      });
      res.status(200).send(data);
    })
  }

  module.exports = appRouter;
