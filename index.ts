import express from 'express';
import { adminRoute, vendorRoute } from './routes';

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminRoute);
app.use('/vendor', vendorRoute)

app.listen(3333, () => {
    console.clear()
    console.log('Server started on port 3333!');
});