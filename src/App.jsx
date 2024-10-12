import { useEffect, useState } from 'react';
import './App.css';
import UserData from './components/UserData';
import EmailDetail from './components/EmailDetail';

const API = "https://flipkart-email-mock.now.sh/";

function App() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filter, setFilter] = useState('all');

  // Fetch email list
  const fetchEmails = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.list) {
        setEmails(data.list);
      }
    } catch (e) {
      console.error(e);
    }
  };

 // Inside App.jsx when handling email click
const handleEmailClick = async (id) => {
  try {
    const res = await fetch(`${API}?id=${id}`);
    const emailDetail = await res.json();
    console.log(emailDetail); // Log the response to check the structure

    if (emailDetail) {
      setSelectedEmail({ ...emailDetail, id });
      setEmails((prevEmails) =>
        prevEmails.map((email) =>
          email.id === id ? { ...email, read: true } : email
        )
      );
    }
  } catch (e) {
    console.error(e);
  }
};

  // Filter emails based on filter option
  const filteredEmails = emails.filter((email) => {
    if (filter === 'favorites') return email.favorite;
    if (filter === 'read') return email.read;
    if (filter === 'unread') return !email.read;
    return true;
  });

  // Mark an email as favorite
  const markAsFavorite = (id) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, favorite: !email.favorite } : email
      )
    );
  };

  useEffect(() => {
    fetchEmails(API);
  }, []);

  return (
    <div className="app-container">
      <section className="email-section">
        <div className="header-body">
          <ul>
            <li onClick={() => setFilter('all')}>All</li>
            <li onClick={() => setFilter('unread')}>Unread</li>
            <li onClick={() => setFilter('read')}>Read</li>
            <li onClick={() => setFilter('favorites')}>Favorites</li>
          </ul>
        </div>

        <div className="master-detail-container">
          <div className="email-list">
            {/* Render email list */}
            <UserData emails={filteredEmails} onEmailClick={handleEmailClick} />
          </div>

          {/* Render email body when an email is selected */}
          {selectedEmail && (
            <div className="email-body">
              <EmailDetail email={selectedEmail} onMarkFavorite={() => markAsFavorite(selectedEmail.id)} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
