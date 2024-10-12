const UserData = ({ emails, onEmailClick }) => {
    return (
      <>
        {emails.map((email) => {
          const { id, from, date, subject, short_description, read, favorite } = email;
          return (

            <div
              key={id}
              className={`email-item ${read ? 'read' : 'unread'}`}
              onClick={() => onEmailClick(id)}
            >

             
             <div className='left-head'>
    <div className='circle'>F</div>
          </div>
          <div className="subject-body"> 
              <p className="subject">From: {from.email}</p>
              <p className="subject">Subject: {subject}</p>
              <p className="short-description">{short_description}</p>
              <p className="date">
                {new Date(date).toLocaleString()} <span>{favorite ? '★' : '☆'}</span>
              </p>
              </div>
            </div>

          );
        })}
      </>
    );
  };
  
  export default UserData;
  
