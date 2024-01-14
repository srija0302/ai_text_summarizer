const express = require('express');
const cors = require('cors'); 
const OpenAI = require('openai');
const app = express();

const openai = new OpenAI({ apiKey: 'API_KEY', dangerouslyAllowBrowser: true }); // Replace 'API_KEY' with actual OpenAI API key

app.use(cors());  

app.use(express.json());

app.post('/generate-summary', async (req, res) => {
  const { valueText } = req.body;

  const prompt = `Give the summary for this text: "${valueText}"`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ "role": "user", "content": prompt }],
      max_tokens: 1000,
      n: 1
    });

    const summary = response.choices[0].message;
    res.header('Access-Control-Allow-Origin', '*'); 
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
