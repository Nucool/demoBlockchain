import React, { Component } from 'react';
import axios from 'axios';
import AccountList from './components/AccountList.js';
import AccountTransfer from './components/AccountTransfer.js';
import Ticket from './components/Ticket.js';
import TicketConfig from './components/TicketConfig.js';
import CreateAccount from './components/CreateAccount.js';
import BuyTicketFactory from './components/BuyTicketFactory.js';
import './App.css';

let apiDomain = 'http://localhost:3009'
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accounts: [],
      accountTransfer: null,
      sendTransaction: {
        from: '',
        to: '',
        eth: '',
        isSending: false
      },
      ticketRemain: 0,
      buyTicket: {
        ownerTicket: 0,
        buyer: '',
        amount: 0,
        isSending: false
      },
      createAccount: {
        name: '',
        telephone: '',
        isSending: false
      },
      ticketConfig: {
        account: '',
        price: 0,
        ownerTicket: 0,
        ownerName: '',
        ownerTelephone: '',
        isSending: false
      },
      buyTicketFactory: {
        ownerTicketInfo: null,
        seller: '',
        buyer: '',
        total: 0,
        price: 0,
        isSending: false
      },
      page: ''
    }
    this.handleSelectAccount = this.handleSelectAccount.bind(this)
    this.handleTransferETH = this.handleTransferETH.bind(this)
    this.handleInputETHTransferChange = this.handleInputETHTransferChange.bind(this)
    this.handleInputAddressTransferChange = this.handleInputAddressTransferChange.bind(this)
    this.handleInputAmountBuyTicketChange = this.handleInputAmountBuyTicketChange.bind(this)
    this.handleBuyTicket = this.handleBuyTicket.bind(this)
    this.handleIsSendingTransfer = this.handleIsSendingTransfer.bind(this)
    this.handleIsSendingBuyTicket = this.handleIsSendingBuyTicket.bind(this)
    this.handleCreateAccount = this.handleCreateAccount.bind(this)
    this.handleInputAccountNameChange = this.handleInputAccountNameChange.bind(this)
    this.handleInputAccountTelephoneChange = this.handleInputAccountTelephoneChange.bind(this)
    this.handleIsSendingCreateAccount = this.handleIsSendingCreateAccount.bind(this)
    this.handleInputTicketConfigPriceChange = this.handleInputTicketConfigPriceChange.bind(this)
    this.handleIsSendingTicketConfig = this.handleIsSendingTicketConfig.bind(this)
    this.handleTicketConfig = this.handleTicketConfig.bind(this)
    this.handleInputBuyTicketFactorySellerChange = this.handleInputBuyTicketFactorySellerChange.bind(this)
    this.handleInputBuyTicketFactoryTotalChange = this.handleInputBuyTicketFactoryTotalChange.bind(this)
    this.handleIsSendingBuyTicketFactory = this.handleIsSendingBuyTicketFactory.bind(this)
    this.handleBuyTicketFactory = this.handleBuyTicketFactory.bind(this)
  }

  fetchData(sendTransaction) {
    axios.get(`${apiDomain}/account`)
    .then(response => {
      let accounts = response.data
      this.setState({
        accounts: accounts,
      });
      /*axios.get(`${apiDomain}/ticket`).then(response => {
      let ticketTotal = response.data.ticketTotal
      this.setState({
      accounts: accounts,
      ticketRemain: ticketTotal,
      sendTransaction: Object.assign({}, this.state.sendTransaction, {
      to: '',
      eth: '',
      isSending: false
      }),
      })
      })*/
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  handleSelectAccount(account) {
    axios.get(`${apiDomain}/ticket/${account.address}`)
    .then(response => {
      console.log('response',response)
      this.setState({
        accountTransfer: account,
        sendTransaction: {
          from: account.address,
          to: '',
          eth: ''
        },
        buyTicket: {
          ownerTicket: response.data.ownerTicket,
          buyer: account.address,
          amount: 0
        },
        ticketConfig: {
          account: account.address,
          price: parseInt(response.data.price),
          ownerTicket: response.data.ownerTicket,
          ownerName: response.data.ownerName,
          ownerTelephone: response.data.ownerTelephone,
        },
        buyTicketFactory: {
          ownerTicketInfo: null,
          seller: '',
          buyer: account.address,
          total: 0,
          price: 0,
          isSending: false
        },
        page: ''
      })
    })
  }

  handleInputAddressTransferChange(e) {
    this.setState({
      sendTransaction: Object.assign({}, this.state.sendTransaction, {
        to: e.target.value
      })
    })
  }

  handleIsSendingTransfer(isSending) {
    this.setState({
      sendTransaction: Object.assign({}, this.state.sendTransaction, {
        isSending: isSending
      })
    })
  }

  handleIsSendingBuyTicket(isSending) {
    this.setState({
      buyTicket: Object.assign({}, this.state.buyTicket, {
        isSending: isSending
      })
    })
  }

  handleInputETHTransferChange(e) {
    this.setState({
      sendTransaction: Object.assign({}, this.state.sendTransaction, {
        eth: e.target.value
      })
    })
  }

  handleTransferETH(data) {
    console.log('handleTransferETH', data)
    this.handleIsSendingTransfer(true);
    axios.post(`${apiDomain}/account/transfer`, data)
    .then(response => {
      console.log('response',response)
      this.handleIsSendingTransfer(false);
      this.fetchData(this.state.sendTransaction)
    })
  }

  handleInputAmountBuyTicketChange(e) {
    this.setState({
      buyTicket: Object.assign({}, this.state.buyTicket, {
        amount: e.target.value
      })
    })
  }

  handleBuyTicket(data) {
    console.log('handleBuyTicket', data)
    this.handleIsSendingBuyTicket(true);
    axios.post(`${apiDomain}/ticket/buy`, data)
    .then(response => {
      console.log('response',response)
      this.handleIsSendingBuyTicket(false);
      this.fetchData(this.state.sendTransaction)
    })
  }

  handleGoToPageCreateAccount() {
    this.setState({
      page: 'createAccount'
    })
  }


  handleInputAccountNameChange(e) {
    this.setState({
      createAccount: Object.assign({}, this.state.createAccount, {
        name: e.target.value
      })
    })
  }

  handleInputAccountTelephoneChange(e) {
    this.setState({
      createAccount: Object.assign({}, this.state.createAccount, {
        telephone: e.target.value
      })
    })
  }

  handleIsSendingCreateAccount(isSending) {
    this.setState({
      createAccount: Object.assign({}, this.state.createAccount, {
        isSending: isSending
      })
    })
  }

  handleCreateAccount(data){
    console.log('handleCreateAccount', data)
    this.handleIsSendingCreateAccount(true);
    axios.post(`${apiDomain}/account/create`, data)
    .then(response => {
      console.log('response',response)
      this.handleIsSendingCreateAccount(false);
      this.setState({
        createAccount: {
          name: '',
          telephone: '',
          isSending: false
        }
      })
      this.fetchData(this.state.sendTransaction)
    })
  }

  handleInputTicketConfigPriceChange(e) {
    this.setState({
      ticketConfig: Object.assign({}, this.state.ticketConfig, {
        price: e.target.value
      })
    })
  }

  handleIsSendingTicketConfig(isSending) {
    this.setState({
      ticketConfig: Object.assign({}, this.state.ticketConfig, {
        isSending: isSending
      })
    })
  }

  handleTicketConfig(data){
    console.log('handleTicketConfig', data)
    this.handleIsSendingTicketConfig(true);
    axios.post(`${apiDomain}/setPriceTicket`, data)
    .then(response => {
      console.log('response',response)
      this.handleIsSendingTicketConfig(false);
      this.fetchData(this.state.sendTransaction)
    })
  }

  handleInputBuyTicketFactorySellerChange(e){
    let seller = e.target.value
    axios.get(`${apiDomain}/ticket/${seller}`)
    .then(response => {
      this.setState({
        buyTicketFactory: Object.assign({}, this.state.buyTicketFactory, {
          ownerTicketInfo: response.data,
          seller: seller,
          price: parseInt(response.data.price)
        })
      })
    })
  }

  handleInputBuyTicketFactoryTotalChange(e) {
    this.setState({
      buyTicketFactory: Object.assign({}, this.state.buyTicketFactory, {
        total: parseInt(e.target.value)
      })
    })
  }

  handleIsSendingBuyTicketFactory(isSending) {
    this.setState({
      buyTicketFactory: Object.assign({}, this.state.buyTicketFactory, {
        isSending: isSending
      })
    })
  }

  handleBuyTicketFactory(data) {
    console.log('handleBuyTicketFactory', data)
    this.handleIsSendingBuyTicketFactory(true);
    axios.post(`${apiDomain}/buyTicketFactory`, data)
    .then(response => {
      console.log('response',response)
      this.handleIsSendingBuyTicketFactory(false);
      this.fetchData(this.state.sendTransaction)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-title">
            Demo Wallet
            <button type="button" className="btn btn-primary" style={{marginLeft:'15px'}}
              onClick={()=>{this.handleGoToPageCreateAccount()}}
              >
               Create Account
              </button>
            </div>
          </header>
          <div className="rowdata">
            <AccountList
              accounts={this.state.accounts}
              onSelectAccount={this.handleSelectAccount} />

            <div className="main" style={{display: this.state.page === '' ? 'block': 'none'}}>
              <AccountTransfer
                account={this.state.accountTransfer}
                accounts={this.state.accounts}
                sendTransaction={this.state.sendTransaction}
                onHandleInputETHTransferChange={this.handleInputETHTransferChange}
                onHandleInputAddressTransferChange={this.handleInputAddressTransferChange}
                onHandleTransferETH={this.handleTransferETH}
                />
              {
                this.state.accountTransfer !== null && 1===2 ?
                <Ticket
                  ticketRemain={this.state.ticketRemain}
                  account={this.state.sendTransaction}
                  buyTicket={this.state.buyTicket}
                  onHandleInputAmountBuyTicketChange={this.handleInputAmountBuyTicketChange}
                  onHandleBuyTicket={this.handleBuyTicket}
                  />
                : null
              }
              {
                this.state.accountTransfer !== null ?
                <TicketConfig
                  ticketConfig={this.state.ticketConfig}
                  onHandleInputTicketConfigPriceChange={this.handleInputTicketConfigPriceChange}
                  onHandleTicketConfig={this.handleTicketConfig}
                  />
                : null
              }
              {
                this.state.accountTransfer !== null ?
                <BuyTicketFactory
                  buyTicketFactory={this.state.buyTicketFactory}
                  accounts={this.state.accounts}
                  onHandleInputBuyTicketFactorySellerChange={this.handleInputBuyTicketFactorySellerChange}
                  onHandleInputBuyTicketFactoryTotalChange={this.handleInputBuyTicketFactoryTotalChange}
                  onHandleBuyTicketFactory={this.handleBuyTicketFactory}
                  />
                : null
              }
            </div>

            <div className="main" style={{display: this.state.page === 'createAccount' ? 'block': 'none'}}>
              <CreateAccount
                createAccount={this.state.createAccount}
                onHandleInputAccountNameChange={this.handleInputAccountNameChange}
                onHandleInputAccountTelephoneChange={this.handleInputAccountTelephoneChange}
                onHandleCreateAccount={this.handleCreateAccount}
                />
            </div>
          </div>
          <footer className="App-footer text-muted">
            &copy; nopadon
          </footer>
        </div>
      );
    }
  }
  export default App;
