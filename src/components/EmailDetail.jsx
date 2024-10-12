const EmailDetail = ({ email, onMarkFavorite }) => {
    // Ensure email object contains all required fields
    if (!email) {
      return <p>No email selected.</p>; // In case email details haven't loaded yet
    }
  
    // Destructure email object to access the details
    const { subject, body, date, favorite } = email;
  
    return (
      <div className="email-detail">
        {/* Display email details */}
        <h2>Subject: {subject}</h2>
        <p><strong>Date:</strong> {new Date(date).toLocaleString()}</p>
        
        {/* Display the email body */}
        <div className="email-body-content">
          <p>{body}</p>
        </div>
        
        {/* Favorite button */}
        <button className="favorite-btn" onClick={onMarkFavorite}>
          {favorite ? 'Unmark Favorite' : 'Mark as Favorite'}
        </button>
      </div>
    );
  };
  
  export default EmailDetail;
  