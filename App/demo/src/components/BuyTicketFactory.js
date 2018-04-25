import React from 'react'

const BuyTicketFactory = (props) => {
  const { buyTicketFactory, accounts } = props
  console.log('buyTicketFactory',buyTicketFactory)
  const ownerTicketInfo = buyTicketFactory.ownerTicketInfo
  return (
    <div className="mainRow" >
      <div style={{textAlign:'left', padding: 5, fontWeight: 'bold', fontSize: '1.2em'}}>Buy Ticket</div>
      <div>
        <form className="form-horizontal">
          <div className="form-group">
            <label className="control-label col-sm-3" >Owner Ticket Account :</label>
            <div className="col-sm-9">
              <select className="form-control"
                disabled={buyTicketFactory.isSending}
                value={buyTicketFactory.seller}
                onChange={props.onHandleInputBuyTicketFactorySellerChange}>
                <option value="" >Owner Ticket Account</option>
                { accounts.map(item => <option key={item.address} value={item.address.toLowerCase()}>{item.name}</option> )}
              </select>

            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-sm-3" >Owner Ticket Total :</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" placeholder="Owner Ticket Total"
                disabled={true}
                value={ownerTicketInfo !== null ? ownerTicketInfo.ownerTicket : 0} />

            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3" >Owner Ticket Price :</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" placeholder="Owner Ticket Price"
                disabled={true}
                value={ownerTicketInfo !== null ? ownerTicketInfo.price : 0} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3" >Buy Ticket :</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" placeholder="Total"
                disabled={buyTicketFactory.isSending}
                value={buyTicketFactory.total === 0 ? '' : buyTicketFactory.total}
                onChange={props.onHandleInputBuyTicketFactoryTotalChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-3" ></div>
            <div className="col-sm-9" style={{textAlign:'left'}}>
              <button type="button" className="btn btn-default btn-success"
                disabled={buyTicketFactory.isSending}
                onClick={() => { props.onHandleBuyTicketFactory(buyTicketFactory) }}
                >
                { buyTicketFactory.isSending ? 'Pending...' : 'Buy Ticket' }
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BuyTicketFactory
