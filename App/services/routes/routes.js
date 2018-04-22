const Web3 = require('web3')
const contracttruff = require('truffle-contract')
const ticket_artifacts = require('../../../contracts/ticketContract/build/contracts/Ticket.json')


let web3 = new Web3()
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

var contract = contracttruff(ticket_artifacts);
contract.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
if (typeof contract.currentProvider.sendAsync !== "function") {
  contract.currentProvider.sendAsync = function() {
    return contract.currentProvider.send.apply(
      contract.currentProvider, arguments
    );
  };
}


var metaContract
var account
var allEvents
contract.deployed().then(function(deployed) {
  metaContract = deployed
  console.log('metaContract', metaContract)

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
})

const ethPersonal = web3.eth.personal

const getAccountBalance = async () => {
  let accountBalance = []
  let accounts = await ethPersonal.getAccounts()
  for (let index in accounts) {
    let account = accounts[index]
    let balance = await web3.eth.getBalance(account)
    let ownerTicket = await metaContract.getTickets.call({from: account})
    accountBalance.push({
      name:'account ' + (parseInt(index)+1),
      address: account,
      eth: web3.utils.fromWei(balance),
      ownerTicket: ownerTicket
    })
  }
  return accountBalance;
}

var appRouter = function (app) {
  app.get("/account", async function (req, res) {
    let data = await getAccountBalance()
    res.status(200).send(data);
  });

  app.post("/account/transfer", async function (req, res) {
    console.log(req.body)
    ethPersonal.unlockAccount(req.body.from, "11111111", 600).then((response) => {
      console.log('response', response)
      web3.eth.sendTransaction({from: req.body.from, to: req.body.to, value: web3.utils.toWei(req.body.eth, 'ether')})
      .then((response) => {
        console.log('sent transaction', response)
        res.status(200).send(req.body);
      })
    })
  });

  app.post("/account/create", async function (req, res) {
    await ethPersonal.newAccount('11111111')
    let data = await getAccountBalance()
    res.status(200).send(data);
  })

  app.get("/ticket", async function (req, res) {
    let ticketTotal = await metaContract.getTicketsTotal.call({from: account})
    console.log('await', ticketTotal)

    let data = ({
      ticketTotal: ticketTotal
    });

    res.status(200).send(data);
  })

  app.get("/ticket/:account", async function (req, res) {
    let account = req.params.account
    let ownerTicket = await metaContract.getTickets.call({from: account})
    let data = ({
      ownerTicket: ownerTicket
    });

    res.status(200).send(data);
  })

  app.get("/buyticket" , async function (req, res) {
    console.log('buyticket')
    let response = await metaContract.buyTickets(1, {from: '0x50dfe168c2679c443d4efd9856068dcc489d5310', value: web3.utils.toWei('1', 'ether')})
    console.log('response', response)

    let data = ({
      ticketTotal: true
    });
    res.status(200).send(data);
  })

  app.post("/ticket/buy" , async function (req, res) {
    let amount = req.body.amount
    let buyer = req.body.buyer

    console.log('buyticket')
    let response = await metaContract.buyTickets(amount, {from: buyer, value: web3.utils.toWei(amount, 'ether')})
    console.log('response', response)

    let data = ({
      ticketTotal: true
    });
    res.status(200).send(data);
  })

}

module.exports = appRouter;
