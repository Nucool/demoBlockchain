import React, { Component } from 'react';
import axios from 'axios';
import AccountList from './components/AccountList.js';
import AccountTransfer from './components/AccountTransfer.js';
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
        eth: ''
      }
    }
    this.handleSelectAccount = this.handleSelectAccount.bind(this)
    this.handleTransferETH = this.handleTransferETH.bind(this)
    this.handleInputETHTransferChange = this.handleInputETHTransferChange.bind(this)
    this.handleInputAddressTransferChange = this.handleInputAddressTransferChange.bind(this)
  }

  componentDidMount() {
    axios.get(`${apiDomain}/account`)
    .then(response => {
      console.log('response',response)
      this.setState({
        accounts: response.data
      })
    })
  }

  handleSelectAccount(account) {
    this.setState({
      accountTransfer: account,
      sendTransaction: {
        from: account.address,
        to: '',
        eth: ''
      }
    })
  }

  handleInputAddressTransferChange(e) {
    this.setState({
      sendTransaction: Object.assign({}, this.state.sendTransaction, {
        to: e.target.value
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
    axios.post(`${apiDomain}/account/transfer`, data)
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
          <AccountTransfer
            account={this.state.accountTransfer}
            sendTransaction={this.state.sendTransaction}
            onHandleInputETHTransferChange={this.handleInputETHTransferChange}
            onHandleInputAddressTransferChange={this.handleInputAddressTransferChange}
            onHandleTransferETH={this.handleTransferETH} />
        </div>
        <footer className="App-footer text-muted">
          &copy; nopadon
        </footer>
      </div>
    );
  }
}

export default App;
