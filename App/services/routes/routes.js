const Web3 = require('web3')
const contracttruff = require('truffle-contract')


let web3 = new Web3()
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));


const ethPersonal = web3.eth.personal

const getAccountBalance = async () => {
  let accountBalance = []
  let accounts = await ethPersonal.getAccounts()
  for (let index in accounts) {
    let account = accounts[index]
    let balance = await web3.eth.getBalance(account)
    accountBalance.push({name:'account ' + (parseInt(index)+1), address: account, eth: web3.utils.fromWei(balance) })
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
      })
    })
    res.status(200).send(req.body);
  });
}

module.exports = appRouter;
