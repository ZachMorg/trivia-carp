"use strict";

const express = require('express');
const cors = require('cors');

const {NotFoundError} = require('./expressError');

const usersRoutes = require('./routes/users');
const gamesRoutes = require('./routes/games');
const authRoutes = require('./routes/auth');

const morgan = require('morgan');
const { authenticateJWT } = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authenticateJWT);

app.use('/users', usersRoutes);
app.use('/games', gamesRoutes);
app.use('/auth', authRoutes);

app.use(function(req,res,next){
    return next(new NotFoundError());
});

app.use(function(err,req,res,next){
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: {message, status}
    });
});

module.exports = app;