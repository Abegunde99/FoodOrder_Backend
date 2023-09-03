import express from 'express';
import { adminRoute, vendorRoute } from './routes';
import { connectDb } from './config/index'
require('dotenv').config()

const app = express();

//connect to db
connectDb()

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminRoute);
app.use('/vendor', vendorRoute)

app.listen(3333, () => {
    console.log('Server started on port 3333!');
});