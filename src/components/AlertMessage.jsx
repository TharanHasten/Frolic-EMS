const AlertMessage = ({ message, type }) => {
    return (
      <div className={`alert-message ${type}`}>
        {message}
      </div>
    );
  };
  
  export default AlertMessage;
  