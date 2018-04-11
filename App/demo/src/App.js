import React, { Component } from 'react';
import axios from 'axios';
import AccountList from './components/AccountList.js';
import AccountTransfer from './components/AccountTransfer.js';
import Ticket from './components/Ticket.js';
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
        amount: 0
      }
    }
    this.handleSelectAccount = this.handleSelectAccount.bind(this)
    this.handleTransferETH = this.handleTransferETH.bind(this)
    this.handleInputETHTransferChange = this.handleInputETHTransferChange.bind(this)
    this.handleInputAddressTransferChange = this.handleInputAddressTransferChange.bind(this)
    this.handleInputAmountBuyTicketChange = this.handleInputAmountBuyTicketChange.bind(this)
    this.handleBuyTicket = this.handleBuyTicket.bind(this)
    this.handleIsSendingTransfer = this.handleIsSendingTransfer.bind(this)
  }

  fetchData(sendTransaction) {
    axios.get(`${apiDomain}/account`)
    .then(response => {
      let accounts = response.data
      axios.get(`${apiDomain}/ticket`).
      then(response => {
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
      })
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
        }
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
    axios.post(`${apiDomain}/ticket/buy`, data)
    .then(response => {
      console.log('response',response)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-title">Demo Wallet</div>
        </header>
        <div className="rowdata">
          <AccountList
            accounts={this.state.accounts}
            onSelectAccount={this.handleSelectAccount} />

          <div className="main">
            <AccountTransfer
              account={this.state.accountTransfer}
              sendTransaction={this.state.sendTransaction}
              onHandleInputETHTransferChange={this.handleInputETHTransferChange}
              onHandleInputAddressTransferChange={this.handleInputAddressTransferChange}
              onHandleTransferETH={this.handleTransferETH} />

            {
              this.state.accountTransfer !== null ?
              <Ticket
                ticketRemain={this.state.ticketRemain}
                account={this.state.sendTransaction}
                buyTicket={this.state.buyTicket}
                onHandleInputAmountBuyTicketChange={this.handleInputAmountBuyTicketChange}
                onHandleBuyTicket={this.handleBuyTicket} /> : null
              }

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
