import React from 'react'

const CreateAccount = (props) => {
  const { createAccount } = props
  return (
    <div className="mainRow" >
      <div style={{textAlign:'left', padding: 5, fontWeight: 'bold', fontSize: '1.2em'}}>CreateAccount </div>
      <div>
        <form className="form-horizontal">
          <div className="form-group">
            <label className="control-label col-sm-3" >Name :</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" placeholder="full name"
                disabled={createAccount.isSending}
                value={createAccount.name}
                onChange={props.onHandleInputAccountNameChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3" >Telephone :</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" placeholder="08xxxxxxxx"
                disabled={createAccount.isSending}
                value={createAccount.telephone}
                onChange={props.onHandleInputAccountTelephoneChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-3" ></div>
            <div className="col-sm-9" style={{textAlign:'left'}}>
              <button type="button" className="btn btn-default btn-success"
                onClick={() => { props.onHandleCreateAccount(createAccount) }}
                >
                { createAccount.isSending ? 'Pending...' : 'Create' }
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount
