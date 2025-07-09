// pages/api/chat.js

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Säkerställ att denna är satt i Vercel
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Endast POST tillåtet' });
  }

  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'Ingen meddelandetext skickades.' });
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    const reply = chatCompletion.choices[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: 'OpenAI returnerade inget svar.' });
    }

    res.status(200).json({ reply });
  } catch (error) {
    console.error('OpenAI API-fel:', error);
    res.status(500).json({ error: 'Fel vid kommunikation med OpenAI.' });
  }
}

