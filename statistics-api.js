const express = require('express');
const axios = require('axios');

const app = express();

app.get('/statistics', async (req, res) => {
  const month = req.query.month;  
  const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

  try {
    const response = await axios.get(url);
    const data = response.data;

    let totalSales = 0;
    let totalSoldItems = 0;
    let totalNotSoldItems = 0;

    data.forEach(item => {
      const dateOfSale = item.dateOfSale.slice(0, 7);  
      if (dateOfSale === month) {
        if (item.sold) {
          totalSales += item.price;
          totalSoldItems++;
        } else {
          totalNotSoldItems++;
        }
      }
    });

    res.json({
      total_sale_amount: totalSales,
      total_sold_items: totalSoldItems,
      total_not_sold_items: totalNotSoldItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port =  3000;
app.listen(port);
