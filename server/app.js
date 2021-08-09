require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const nocache = require('nocache');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const {readdirSync} = require('fs');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(helmet());
app.use(logger('dev'));
app.use(nocache())
app.use(cookieParser());


readdirSync('./app/routes').map((r)=> app.use('/api',require(`./app/routes/${r}`)));


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
	connectDB()
	console.log(`App listening to port ${PORT}`)
})

