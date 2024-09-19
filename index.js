/*
const http = require('http');
const port = 3000;
const server = http.createServer((req,res)=>{
    if(req.method==='GET' && req.url==='/'){
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.end('Hello client');
    }else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end('Not Found');
    }
});

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})*/
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser=require('body-parser');//*

const serverPort = process.env.SERVER_PORT;

const customerRoute = require('./routes/CustomerRoute');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));//*
app.use(bodyParser.json());//*

mongoose.connect('mongodb://localhost:27017/TestApp');

app.listen(serverPort, () => {
    console.log(`server up & Running on port ${serverPort}`)
})

app.get('/test', (req, res) => {
    return res.json('server works');
})

app.use('/api/v1/customers', customerRoute);