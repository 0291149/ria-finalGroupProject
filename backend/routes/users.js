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

router.route('/')
    .get(usersController.index)
    .post(usersController.store);

router.route('/:userID')
    .get(usersController.show)
    .put(usersController.update)
    .delete(usersController.destroy);

module.exports = router;