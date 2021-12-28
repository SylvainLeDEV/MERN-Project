const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');
require('dotenv').config({path: './config/.env'});
const {checkUser, requireAuth} = require("./middleware/auth.middleware");
require('./config/db');
const cors = require('cors');

const app = express();

//Cors Policy
const corsOption = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors(corsOption));

//Body parser
app.use(express.json())
app.use(express.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//JWT
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req,res) => {
    res.status(200).send(res.locals.user.id)
});

//Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);



//Server
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}, http://localhost:1234/`)
})