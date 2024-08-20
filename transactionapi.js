const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/api/transactions', async (req, res) => {
    const month = req.query.month; 
    const page = parseInt(req.query.page) || 1; 
    const perPage = parseInt(req.query.perPage) || 10; 
    const search = req.query.search || ''; 

    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const items = response.data;

        
        const filteredItems = items.filter(item => {
            const itemDate = new Date(item.dateOfSale);
            return itemDate.toLocaleString('default', { month: 'long' }) === month;
        });

        
        const searchResults = filteredItems.filter(item => {
            return (
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase()) ||
                item.price.toString().includes(search)
            );
        });

        
        const startIndex = (page - 1) * perPage;
        const paginatedItems = searchResults.slice(startIndex, startIndex + perPage);

        res.json({
            totalItems: searchResults.length,
            currentPage: page,
            totalPages: Math.ceil(searchResults.length / perPage),
            items: paginatedItems,
        });
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT);
