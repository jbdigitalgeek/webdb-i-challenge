const express = require('express');

const Accounts = require('./data/accounts-model');

const server = express();

server.get('/', async (req, res) => {
    try {
        const acctList = await Accounts.find();
        res.status(200).json(acctList);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: `${err}` })
    }
});

server.get('/:id', async (req, res) => {
    try {
        const acctId = await Accounts.findById(req.params.id);
        res.status(200).json(acctId)
    } catch (error) {
        res.status(500).json({ message: `${error}` })
    }
});

module.exports = server;