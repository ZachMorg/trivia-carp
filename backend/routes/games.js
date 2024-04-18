"use strict";

const jsonschema = require('jsonschema');

const express = require('express');
const {ensureLoggedIn, ensureAdmin} = require('../middleware/auth');
const {BadRequestError} = require('../expressError');
const Game = require('../models/game');
const gameSchema = require('../schemas/game.json');

const router = express.Router();


router.post('/', ensureLoggedIn, async function(req,res,next){
    try{
        const validator = jsonschema.validate(req.body, gameSchema);
        if(!validator.valid){
            console.log('validator issue');
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        console.log(`get's through validation`);
        const game = await Game.addGame(req.body);
        return res.status(201).json({game});
    }
    catch(err){
        return next(err);
    }
});


router.get('/', ensureLoggedIn, async function(req,res,next){
    try{
        console.log('Query: ' + req.query);
        const games = await Game.getAll(req.query);
        return res.json({games});
    }
    catch(err){
        return next(err);
    }
});


router.get('/:id', ensureLoggedIn, async function(req,res,next){
    try{
        const game = await Game.get(req.params.id);
        return res.json({game});
    }
    catch(err){
        return next(err);
    }
});


router.delete('/:id', ensureAdmin, async function(req,res,next){
    try{
        await Game.remove(req.params.id);
        return res.json({deleted: req.params.id});
    }
    catch(err){
        return next(err);
    }
});


module.exports = router;