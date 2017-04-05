/**
 * Created by inet2005 on 4/5/17.
 */

var express = require('express');
var router = express.Router();
var eventuserscontroller = require('../controllers/EventsUserController');

router.route('/')
    .get(eventuserscontroller.login);

module.exports = router;