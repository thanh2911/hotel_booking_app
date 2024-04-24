import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import useRouters from './routes/users';
import authRouters from './routes/auth';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/api/users",useRouters)
app.use("/api/auth",authRouters)

const { connect } = require('./config/database');
connect();

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`server running on localhost:${PORT}`);
    
})