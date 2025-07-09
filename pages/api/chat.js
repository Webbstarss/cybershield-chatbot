import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    const aiMessage = response.choices?.[0]?.message?.content;
    if (!aiMessage) {
      return res.status(500).json({ error: 'OpenAI gav inget giltigt svar' });
    }

    res.status(200).json({ message: aiMessage });
  } catch (error) {
    console.error('OpenAI-fel:', error);
    res.status(500).json({ error: error.message || 'Något gick fel' });
  }
}
