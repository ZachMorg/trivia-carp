"use strict";

const db = require('../db');
const {
    NotFoundError,
    BadRequestError
} = require('../expressError');


class Game{

    static async addGame({username, numQuestions, numCorrect, category}){
        console.log(username);
        const userCheck = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
             [username]
        );

        const user = userCheck.rows[0];
        console.log(user);
        console.log(numQuestions);
        console.log(numCorrect);
        console.log(category);
        if(!user){
            throw new NotFoundError(`User ${username} not found`);
        }

        const result = await db.query(
            `INSERT INTO games (username, num_questions, num_correct, category)
             VALUES ($1, $2, $3, $4)
             RETURNING id, username, num_questions AS "numQuestions", num_correct AS "numCorrect", category`,
             [username, numQuestions, numCorrect, category]
        );

        return result.rows[0];
    }


    static async getAll({username}){
        console.log(username);
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

        const result = await db.query(
            `SELECT id, username, num_questions AS "numQuestions", num_correct AS "numCorrect", category
             FROM games
             WHERE username = $1
             ORDER BY id DESC`,
             [username]
        );

        return result.rows;
    }


    static async get(id){
        const result = await db.query(
            `SELECT id, username, num_questions AS "numQuestions", num_correct AS "numCorrect", category
             FROM games
             WHERE id = $1`,
             [id]
        );

        if(!result.rows[0]){
            throw new NotFoundError(`Game id ${id} not found`);
        }

        return result.rows[0];
    }


    static async remove(id){
        const result = await db.query(
            `DELETE
             FROM games
             WHERE id = $1
             RETURNING id`,
             [id]
        );

        const game = result.rows[0];

        if(!game){
            throw new NotFoundError(`Game id ${id} not found`);
        }
    }
}

module.exports = Game;