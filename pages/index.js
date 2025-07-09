import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.message) {
        setResponse(data.message);
      } else {
        setResponse('AI: OpenAI returnerade inget giltigt svar.');
      }
    } catch (err) {
      console.error(err);
      setResponse('Något gick fel.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Cybershield AI Chat</h1>
      <textarea
        rows={4}
        cols={50}
        placeholder="Skriv din fråga här..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? 'Skickar...' : 'Skicka'}
      </button>
      <p><strong>AI:</strong> {response}</p>
    </main>
  );
}
