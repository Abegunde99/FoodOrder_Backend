import express from 'express';
import App from './services/ExpressApp';
import { connectDb } from './services/Database';
require('dotenv').config()

const startServer = async () => { 
    const app = express();

    await connectDb();
    await App(app);

    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
    });
} 

startServer();