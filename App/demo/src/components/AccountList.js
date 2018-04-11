import React from 'react'

const AccountItem = (props) => {
  const { account } = props
  return (
    <div className="rowdata" onClick={() => { props.onSelectAccount(account) }} style={{flex:100, padding: 5, marginBottom: 10, borderRadius: 5}}>
      <div style={{flex:15, padding:5}}>
        <img src="images/iconWallet.png" alt="wallet" className="iconWallet"></img>
      </div>
      <div style={{flex:80, padding:5}}>
        <div>{account.name}</div>
        <div className="text-muted" >
          <span style={{color:'orange', paddingRight: 5}}>{account.eth}</span>
          <span style={{fontSize: '0.7em'}}>ETH</span>
        </div>
        <div className="text-muted" style={{fontSize: '0.9em'}} >{account.address.toLowerCase()}</div>
        <div className="text-muted" style={{fontSize: '0.9em'}} >{account.ownerTicket} Ticket(s)
        </div>
      </div>
    </div>
  );
}

const AccountList = (props) => {
  const { accounts } = props
  return (
    <div className="side">
      { accounts.map(item => <AccountItem key={item.name} account={item} {...props} />) }
    </div>
  )
}
export default AccountList
