import React from 'react'

const Ticket = (props) => {
  console.log('ticket', props)
  const { buyTicket } = props
  return (
    <div className="mainRow" >
      <div style={{textAlign:'left', padding: 5, fontWeight: 'bold', fontSize: '1.2em'}}>Ticket [ Remain {props.ticketRemain} item(s) ]</div>
      <div>
        <form className="form-horizontal">
          <div className="form-group">
            <label className="control-label col-sm-3" >Owner ticket(s) :</label>
            <div className="col-sm-2" style={{textAlign:'left'}}>
              <span>{buyTicket.ownerTicket}</span>
              <img src="images/iconTicket.png" alt="ticket" className="iconTicket"></img>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3" >Amount :</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" placeholder="amount"
                disabled={buyTicket.isSending}
                value={buyTicket.amount}
                onChange={props.onHandleInputAmountBuyTicketChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-3" ></div>
            <div className="col-sm-9" style={{textAlign:'left'}}>
              <button type="button" className="btn btn-default btn-success"
                onClick={() => { props.onHandleBuyTicket(buyTicket) }}
                >
                { buyTicket.isSending ? 'Pending...' : 'Buy ticket' }
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Ticket
