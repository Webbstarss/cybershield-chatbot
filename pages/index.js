// pages/index.js

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setError('');
    setReply('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (response.ok) {
        setReply(data.reply);
      } else {
        setError(data.error || 'Ett fel uppstod.');
      }
    } catch (err) {
      setError('Kunde inte nå servern.');
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', padding: 20, fontFamily: 'Arial' }}>
      <h1>Cybershield Chatbot</h1>
      <textarea
        rows="4"
        style={{ width: '100%', padding: 10 }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Skriv din fråga här..."
      />
      <button
        onClick={sendMessage}
        style={{ marginTop: 10, padding: '10px 20px', fontSize: '16px' }}
        disabled={loading}
      >
        {loading ? 'Skickar...' : 'Skicka'}
      </button>

      {error && <p style={{ color: 'red', marginTop: 20 }}>Fel: {error}</p>}
      {reply && (
        <div style={{ marginTop: 20, background: '#f2f2f2', padding: 15, borderRadius: 8 }}>
          <strong>AI:</strong>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}

