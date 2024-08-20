const express = require('express');
const axios = require('axios');

const app = express();

app.get('/category-statistics', async (req, res) => {
  const month = req.query.month; 
  const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

  try {
    const response = await axios.get(url);
    const data = response.data;

    const categoryCounts = {};

    data.forEach(item => {
      const dateOfSale = new Date(item.dateOfSale);
      const itemMonth = String(dateOfSale.getMonth() + 1).padStart(2, '0'); 
      if (itemMonth === month) {
        const category = item.category;
        if (categoryCounts[category]) {
          categoryCounts[category]++;
        } else {
          categoryCounts[category] = 1;
        }
      }
    });

    res.json(categoryCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port);
