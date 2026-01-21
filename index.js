import express from 'express';
import cors from 'cors';
import memoRouter from './memos.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${JSON.stringify(req.body)}`);
    next();
});

app.use("/memos", memoRouter);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Resource not found"
    });
})

app.listen(3001);