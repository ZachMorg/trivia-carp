"use strict";

const jsonschema = require('jsonschema');

const express = require('express');
const {ensureAdmin, ensureCorrectUserOrAdmin, ensureLoggedIn} = require('../middleware/auth');
const {BadRequestError} = require('../expressError');
const User = require('../models/user');
const {createToken} = require('../helpers/tokens');
const userNewSchema = require('../schemas/userNew.json');
const userUpdateSchema = require('../schemas/userUpdate.json');

const router = express.Router();


router.post('/', ensureAdmin, async function(req,res,next){
    try{
        const validator = jsonschema.validate(req.body, userNewSchema);
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const user = await User.register(req.body);
        const token = createToken(user);
        return res.status(201).json({user, token});
    }
    catch(err){
        return next(err);
    }
});


router.get('/', ensureLoggedIn, async function(req,res,next){
    try{
        console.log('Get all users search term: ' + req.query);
        const users = await User.findAll(req.query);
        return res.json({users});
    }
    catch(err){
        return next(err);
    }
});


router.get('/:username', ensureLoggedIn, async function(req,res,next){
    try{
        const user = await User.get(req.params.username);
        return res.json({user});
    }
    catch(err){
        return next(err);
    }
});


router.patch('/:username', ensureCorrectUserOrAdmin, async function(req,res,next){
    try{
        const validator = jsonschema.validate(req.body, userUpdateSchema);
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const user = await User.update(req.params.username, req.body);
        return res.json({user});
    }
    catch(err){
        return next(err);
    }
});


router.delete('/:username', ensureCorrectUserOrAdmin, async function(req,res,next){
    try{
        await User.remove(req.params.username);
        return res.json({deleted: req.params.username});
    }
    catch(err){
        return next(err);
    }
});


router.post('/:username/:friendUsername', ensureCorrectUserOrAdmin, async function(req,res,next){
    try{
        console.log(req.params);
        const friend = await User.addFriend(req.params.username, req.params.friendUsername);
        return res.json({friend});
    }
    catch(err){
        return next(err);
    }
});


router.delete('/:username/:friendUsername', ensureCorrectUserOrAdmin, async function(req,res,next){
    try{
        await User.removeFriend(req.params.username, req.params.friendUsername);
        return res.json({removed: req.params.friendUsername});
    }
    catch(err){
        return next(err);
    }
})


module.exports = router;