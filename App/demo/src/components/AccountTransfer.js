import React from 'react'

const AccountTransfer = (props) => {
  const { account, accounts, sendTransaction } = props

  if(account === null){
    return (
      <div className="main">
        Select Account
      </div>
    )
  }
  return (
    <div className="mainRow" >
      <div style={{textAlign:'left', padding: 5, fontWeight: 'bold', fontSize: '1.2em'}}>Send Transaction</div>
      <div>
        <form className="form-horizontal">
          <div className="rowdata" style={{flex:100, padding: 5, marginBottom: 10, borderRadius: 5}}>
            <div style={{flex:20, padding:5}}>
              <img src="images/iconWallet.png" alt="wallet" className="iconWallet"></img>
            </div>
            <div style={{flex:80, padding:5, textAlign: 'left'}}>
              <div>{account.name}</div>
              <div className="text-muted" >
                <span style={{color:'orange', paddingRight: 5}}>{account.eth}</span>
                <span style={{fontSize: '0.7em'}}>ETH</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3" >From Address :</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" disabled="disabled" value={sendTransaction.from.toLowerCase()}  />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3" >Recipient Account :</label>
            <div className="col-sm-9">
              <select className="form-control"
                disabled={sendTransaction.isSending}
                value={sendTransaction.to}
                onChange={props.onHandleInputAddressTransferChange}>
                <option value="" >Recipient Account</option>
                { accounts.map(item => <option key={item.address} value={item.address.toLowerCase()}>{item.name}</option> )}
              </select>

            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3" >Recipient Address :</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" placeholder="Recipient Address"
                disabled={true}
                value={sendTransaction.to.toLowerCase()} />

            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3" >ETH :</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" placeholder="ETH"
                disabled={sendTransaction.isSending}
                value={sendTransaction.eth}
                onChange={props.onHandleInputETHTransferChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-3" ></div>
            <div className="col-sm-9" style={{textAlign:'left'}}>
              <button type="button" className="btn btn-default btn-success"
                disabled={sendTransaction.isSending}
                onClick={() => { props.onHandleTransferETH(sendTransaction) }}
                >
                { sendTransaction.isSending ? 'Pending...' : 'Transfer' }
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AccountTransfer
