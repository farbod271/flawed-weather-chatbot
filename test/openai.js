const axios = require('axios');

// Replace 'your_api_key' with your actual OpenAI API key
const url = 'https://api.openai.com/v1/chat/completions';



const data = {
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'Say this is a test!' }],
  temperature: 0.7
};

axios.post(url, data, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});

