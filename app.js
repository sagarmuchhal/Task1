const http = require('http');
const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/user', userRoutes);
const {
    dbConnection
} = require('./dbConnection');

dbConnection();
app.get("/", function(request, response) {
    response.send("Hello World!");
});

app.listen(8000);
console.log('Server is listen on port number : 8000');