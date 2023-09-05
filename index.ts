import express from 'express';
import { adminRoute, vendorRoute } from './routes';
import { connectDb } from './config/index'
import cookieParser from 'cookie-parser'
import path from 'path'
require('dotenv').config()

const app = express();

//connect to db
connectDb()

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/admin', adminRoute);
app.use('/vendor', vendorRoute)

app.listen(3333, () => {
    console.log('Server started on port 3333!');
});