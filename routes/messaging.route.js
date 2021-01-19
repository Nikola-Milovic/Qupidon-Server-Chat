const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller')

router.get('/unread',
    async function (req, res) {
        const messages = await UserController.GetUnreadMessages(req.query.id)
        res.send(messages).status(200)
    }
);

module.exports = router;