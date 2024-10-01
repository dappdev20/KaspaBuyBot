import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { getFullTransactions } from './api/tx-monitor.js';

dotenv.config();

const app = express();
const port = process.env.NODE_PORT || 8888;
const server = http.createServer(app);

app.use(cors());

app.use(function (req, res, next) {
    console.log(new Date(), req.connection.remoteAddress, req.method, req.url);
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );

    // Request headers you wish to allow
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function (req, res) {
    res.send('ERROR 404');
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);

    getFullTransactions('kaspa:pz0ne7ltfudpp64df2cxe8ws9g5vdhyc5kq8rfer6nm0mrh5th7322shk2mee');
});
