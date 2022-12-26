const express = require('express');
const request = require('request-promise');

const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.json());

/* const apiKey = 'API_KEY';
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`; */
// localhost:9000/products/productId

const returnScraperApiUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// http://localhost:9000/products/B08156M1LH?api_key=insert_api_key_here

// Welcome route
app.get('/', async (req, res) => {
    res.send('Welcome to Amazon Scraper API!');
});

// Get product details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query; // we name it as api_key in the query 
    // hence the ?api_key = api key here

    try {
        //const response = await request(`${baseURL}&url=https://www.amazon.com/dp/${productId}`);
        const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));