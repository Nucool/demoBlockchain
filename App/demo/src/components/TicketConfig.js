import React from 'react'

const TicketConfig = (props) => {
  const { ticketConfig } = props
  console.log('ticketConfig', ticketConfig)
  return (
    <div className="mainRow" >
      <div style={{textAlign:'left', padding: 5, fontWeight: 'bold', fontSize: '1.2em'}}>Ticket Config</div>
      <div>
        <form className="form-horizontal">
          <div className="form-group">
            <label className="control-label col-sm-3" >Owner ticket(s) :</label>
            <div className="col-sm-2" style={{textAlign:'left'}}>
              <span>{ticketConfig.ownerTicket}</span>
              <img src="images/iconTicket.png" alt="ticket" className="iconTicket"></img>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3" >Price :</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" placeholder="price"
                disabled={ticketConfig.isSending}
                value={ticketConfig.price}
                onChange={props.onHandleInputTicketConfigPriceChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-3" ></div>
            <div className="col-sm-9" style={{textAlign:'left'}}>
              <button type="button" className="btn btn-default btn-success"
                disabled={ticketConfig.isSending || ticketConfig.price === 0}
                onClick={() => { props.onHandleTicketConfig(ticketConfig) }}
                >
                { ticketConfig.isSending ? 'Pending...' : 'Update Ticket' }
              </button>
            </div>
          </div>
      </form>
    </div>
  </div>
)
}

export default TicketConfig
