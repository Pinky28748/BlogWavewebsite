require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const rootDir = require('./util/path-util');
const blogRouter = require('./routes/blogRouter');


const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_DB_URL = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@airbnb.dlqmf.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority&appName=Airbnb`;
//MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database_name>?retryWrites=true&w=majority"


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.static(path.join(rootDir,"public")));
 app.use(express.urlencoded({extended:true}));

app.use(express.json());
app.use(blogRouter);

mongoose.connect(MONGO_DB_URL).then(() => {
    console.log('Database connected');
})

app.listen(PORT,() => {
    console.log('Server started at 3000');
})



