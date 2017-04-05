/*
var express = require('express');
var router = express.Router();

/!* GET users listing. *!/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
*/


var express = require('express');
var router = express.Router();
var usersController = require('../controllers/UsersController');
var eventsUsersController = require('../controllers/EventsUserController');

router.route('/')
    .get(usersController.index)
    .post(usersController.store);

router.route('/:userID')
    .get(usersController.show)
    .put(usersController.update)
    .delete(usersController.destroy);

router.route('/:userID/events')
    .get(eventsUsersController.index)
    .post(eventsUsersController.store);

router.route('/:userID/events/:eventID')
    .get(eventsUsersController.show)
    .put(eventsUsersController.update)
    .delete(eventsUsersController.destroy);

/*
router.get('/:userID/i', function(req, res){
 res.json({message: 'hooray! welcome to our api!'});
 });
*/

module.exports = router;