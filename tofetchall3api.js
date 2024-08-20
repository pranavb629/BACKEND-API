const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/data', async (req, res) => {
  try {
    const [response1, response2, response3] = await Promise.all([
      axios.get('http://localhost:3000/statistics?month=2022-01'),
      axios.get('http://localhost:3000/category-statistics?month=01'),
      axios.get('http://localhost:3000/api/transactions?month=January&page=1&perPage=10&search=backpack'),
    ]);

    const combinedData = {
      data1: response1.data,
      data2: response2.data,
      data3: response3.data,
    };

    res.json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port);
