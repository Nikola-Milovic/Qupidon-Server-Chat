const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller')

router.post('/',
    async function (req, res) {
        UserController.CreateNewUser(req.query.id)
        res.sendStatus(200)
    }
);

router.post('/tok',
    async function (req, res) {
        UserController.AddFCMToken(req.query.id, req.body.token)
        res.sendStatus(200)
    }
);


module.exports = router;