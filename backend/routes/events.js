/**
 * Created by NSCC Student on 4/3/2017.
 */

var express = require('express');
var router = express.Router();
var eventsController = require('../controllers/EventsController');

router.route('/')
    .get(eventsController.index)
    .post(eventsController.store);

router.route('/:eventID')
    .get(eventsController.show)
    .put(eventsController.update)
    .delete(eventsController.destroy);

module.exports = router;