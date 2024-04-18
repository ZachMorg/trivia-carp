"use strict";

const db = require('../db');
const bcrypt = require('bcrypt');
const {sqlForPartialUpdate} = require('../helpers/sql');
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError
} = require('../expressError');

const {BCRYPT_WORK_FACTOR} = require('../config');


class User{


    static async authenticate(username, password){

        const result = await db.query(
            `SELECT username, password, email, is_admin AS "isAdmin"
             FROM users
             WHERE username = $1`,
             [username]
        );
        
        const user = result.rows[0];

        if(user){
            const isValid = await bcrypt.compare(password, user.password);
            if(isValid){
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError('Invalid Username or Password');
    }


    static async register({username, password, email, isAdmin}){
        const duplicateCheck = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
          [username],
      );
  
      if (duplicateCheck.rows[0]) {
        throw new BadRequestError(`Duplicate username: ${username}`);
      }
  
      const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
  
      const result = await db.query(
            `INSERT INTO users
             (username,
              password,
              email,
              is_admin)
             VALUES ($1, $2, $3, $4)
             RETURNING username, email, is_admin AS "isAdmin"`,
          [
            username,
            hashedPassword,
            email,
            isAdmin,
          ],
      );
  
      const user = result.rows[0];
  
      return user;
    }


    static async findAll({search}){
        
        console.log('runs findAll')
        console.log(search);
        let query = `SELECT username,
                       email,
                       is_admin AS "isAdmin"
                       FROM users`;

        let result;

        if(search){
            let formatSearch = `%${search}%`;
            let searchQuery = ` WHERE username ILIKE $1`
            query += searchQuery;
            result = await db.query(query, [formatSearch]);
            console.log(result.rows);
            return result.rows;
        }

        result = await db.query(query);

        return result.rows;
    }


    static async get(username){
        const userRes = await db.query(
            `SELECT username,
                    email,
                    is_admin AS "isAdmin"
             FROM users
             WHERE username = $1`,
             [username]
        );

        const user = userRes.rows[0];

        if(!user){
            throw new NotFoundError(`User ${username} not found`);
        }

        const userFriendsRes = await db.query(
            `SELECT friend_username
             FROM friends AS f
             WHERE f.username = $1`,
             [username]
        );

        user.friends = userFriendsRes.rows.map(f => f.friend_username);
        return user;
    }


    static async update(username, data){
        if(data.password){
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }

        const {setCols, values} = sqlForPartialUpdate(
            data,
            {
                isAdmin: 'is_admin'
            }
        );

        const usernameVarIdx = '$' + (values.length + 1);

        const querySql = `UPDATE users
                          SET ${setCols}
                          WHERE username = ${usernameVarIdx}
                          RETURNING username,
                                    email,
                                    is_admin AS "isAdmin"`;
        const result = await db.query(querySql, [...values, username]);
        const user = result.rows[0];

        if(!user){
            throw new NotFoundError(`User ${username} not found`);
        }

        delete user.password;
        console.log('UPDATED USER');
        return user;
    }


    static async remove(username){
        let result = await db.query(
            `DELETE
             FROM users
             WHERE username = $1
             RETURNING username`,
             [username]
        );
        const user = result.rows[0];

        if(!user){
            throw new NotFoundError(`User ${username} not found`);
        }
    }


    static async addFriend(username, friendUsername){
        const friendCheck = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
             [friendUsername]
        );
        const friend = friendCheck.rows[0];

        if(!friend){
            throw new NotFoundError(`User ${friendUsername} not found`);
        }

        const userCheck = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
             [username]
        );
        const user = userCheck.rows[0];

        if(!user){
            throw new NotFoundError(`User ${username} not found`);
        }

        const friendRes = await db.query(
            `INSERT INTO friends (username, friend_username)
             VALUES ($1, $2)
             RETURNING friend_username AS "friendUsername"`,
             [username, friendUsername]
        );

        return friendRes.rows[0];
    }


    static async removeFriend(username, friendUsername){
        const friendCheck = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
             [friendUsername]
        );
        const friend = friendCheck.rows[0];

        if(!friend){
            throw new NotFoundError(`User ${friendUsername} not found`);
        }

        const userCheck = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
             [username]
        );
        const user = userCheck.rows[0];

        if(!user){
            throw new NotFoundError(`User ${username} not found`);
        }

        await db.query(
            `DELETE
             FROM friends
             WHERE username = $1 AND friend_username = $2`,
             [username, friendUsername]
        );
    }
}


module.exports = User;