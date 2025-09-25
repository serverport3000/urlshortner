import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './db';
import router from './routes';

const main = async () => {
    dotenv.config();
    await connectDB();

    const app = express();

    // middlewares
    app.use(express.json());
    app.use(morgan('dev')); // put it before declaring any routes
    app.use(router);

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};

main().catch((err) => {
    console.error('Server crashed', err);
    process.exit(0);
});
