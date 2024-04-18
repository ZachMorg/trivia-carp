"use strict";

require('dotenv').config();
require('colors');

const SECRET_KEY = process.env.SECRET_KEY || 'password123_secret';

const PORT = +process.env.PORT || 3001;

const getDatabaseUri = function(){
    if(process.env.NODE_ENV === 'production'){
        return 'special db uri'
    }
    return 'postgresql://postgres:Secret123@localhost/trivia_carp'
}

const BCRYPT_WORK_FACTOR = 14;

console.log('TRIVIA CARP:'.magenta);
console.log('SECRET_KEY:'.blue, SECRET_KEY);
console.log('PORT:'.blue, PORT.toString());
console.log('BCRYPT_WORK_FACTOR'.blue, BCRYPT_WORK_FACTOR);
console.log('Database:'.blue, getDatabaseUri());
console.log('-----------------'.red);

module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri
}
