import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';


dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('Server is ready and API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/product', productRoutes);



app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});