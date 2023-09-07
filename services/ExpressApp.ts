import express from 'express';
import { adminRoute, shoppingRoute, vendorRoute } from '../routes';
import cookieParser from 'cookie-parser'
import path from 'path'
require('dotenv').config()


export default async (app: express.Application) => { 
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser())
    app.use('/images', express.static(path.join(__dirname, 'images')))

    app.use('/admin', adminRoute);
    app.use('/vendor', vendorRoute)
    app.use(shoppingRoute)

    return app;
}
