import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';
import connectDB from './config/db.js';


dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('Server is ready and API is running...');
});

app.get('/api/products', (req, res) => {
    res.send(products);
});

app.get('/api/product/:id', (req, res) => {
    const product = products.find((x) => x._id === req.params.id);
    if(product){
        res.send(product);
    } else {
        res.status(404).send({message: 'Product Not Found'});
    }
});

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});