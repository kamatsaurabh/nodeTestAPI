import dotenv from 'dotenv';
dotenv.config({ path: "../backend/config/config.env" })
import express from 'express';
import bodyParser from 'body-parser';
import { errorMiddleware } from "./middleware/error.js";
import productRouter from './routes/productRouter.js';
import connectDatabase from './config/db.js'
const app = express();
// Port declaration from env
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDatabase();

// test api
app.get('/', (req, res) => {
    res.send('Application is working Fine !!!');
})

app.use("/api/v1", productRouter);

// Middleware for Errors
app.use(errorMiddleware);


const server = app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`);
});

// // Unhandled Rejection Error
// process.on("unhandledRejection", (err) => {
//     console.log(`Error: ${err.message}`);
//     console.log(`Shutting down the server due to Unhandled Promise Rejection`);

//     server.close(() => {
//         process.exit(1);
//     });
// });

export default app;