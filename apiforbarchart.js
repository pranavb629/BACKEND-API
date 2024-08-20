const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/api/bar-chart', async (req, res) => {
    const month = parseInt(req.query.month); // Expected format: 'MM'
    const priceRanges = [
        { range: '0-100', count: 0 },
        { range: '101-200', count: 0 },
        { range: '201-300', count: 0 },
        { range: '301-400', count: 0 },
        { range: '401-500', count: 0 },
        { range: '501-600', count: 0 },
        { range: '601-700', count: 0 },
        { range: '701-800', count: 0 },
        { range: '801-900', count: 0 },
        { range: '901-above', count: 0 },
    ];

    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const items = response.data;

        items.forEach(item => {
            const itemDate = new Date(item.dateOfSale);
            if (itemDate.getMonth() + 1 === month) {
                const price = item.price;

                if (price <= 100) priceRanges[0].count++;
                else if (price <= 200) priceRanges[1].count++;
                else if (price <= 300) priceRanges[2].count++;
                else if (price <= 400) priceRanges[3].count++;
                else if (price <= 500) priceRanges[4].count++;
                else if (price <= 600) priceRanges[5].count++;
                else if (price <= 700) priceRanges[6].count++;
                else if (price <= 800) priceRanges[7].count++;
                else if (price <= 900) priceRanges[8].count++;
                else priceRanges[9].count++;
            }
        });

        res.json(priceRanges);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT);
