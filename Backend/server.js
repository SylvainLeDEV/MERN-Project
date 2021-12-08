const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.route');
require('dotenv').config({path: './config/.env'});
const {checkUser, requireAuth} = require("./middleware/auth.middleware");
require('./config/db');

const app = express();

//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//JWT
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req,res) => {
    res.status(200).send(res.locals.user.id)
});

//Routes
app.use('/api/user', userRoutes);



//Server
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})