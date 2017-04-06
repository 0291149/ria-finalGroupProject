/**
 * Created by NSCC Student on 4/3/2017.
 */

//ALTER TABLE `User` CHANGE `password` `password` VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;
//you need to alter table to have password as 255

var bcrypt = require('bcrypt-nodejs');

/*
 UserSchema.pre('save', function(callback){
 var user = this;

 if(!user.isModified('password')) return callback();

 bcrypt.genSalt(5, function(err, salt){
 if(err) return callback(err);

 bcrypt.hash(user.password, salt, null, function(err, hash){
 if(err) return callback(err);
 user.password = hash;
 callback();
 });
 });
 });

 UserSchema.methods.verifyPassword = function(password, cb) {
 bcrypt.compare(password, this.password, function(err, isMatch){
 if(err) return cb(err);
 cb(null, isMatch);
 });
 };
*/

module.exports.index = function(req,res,next){
    req.getConnection(function(err,connection){
        if(err) return next(err);

        var query = connection.query('SELECT * FROM User;', [], function(err, results){
            if (err) return next(err);

            res.json(results);
        });

        console.log(query.sql);

    });
};

module.exports.show = function(req,res,next){

    var userID = req.params.userID;

    req.getConnection(function(err, connection){
        if (err) return next(err);

        var query = connection.query('SELECT * FROM User WHERE userId = ?', [userID], function(err, results){

            if(err) return next(err);

            res.json(results[0]);

        });

        console.log(query.sql);

    });

};

module.exports.store = function(req,res,next){

    var input = req.body;

    var password = input.password;

    bcrypt.genSalt(5, function(err, salt){
        if(err) return callback(err);

        bcrypt.hash(password, salt, null, function(err, hash){
            if(err) return callback(err);
            password = hash;
            //callback();
        });
    });

    req.getConnection(function(err, connection){

        if(err) return next(err);

        var query = connection.query('INSERT INTO User (name, email, password) VALUES (?,?,?);',[input.name, input.email, password], function(err, results){

            if(err) return next(err);

            res.json({message: 'User Created', userId: results.insertId});

        });

        console.log(query.sql);

    });

};

module.exports.update = function(req,res,next){

    var userID = req.params.userID;
    var input = req.body;

    var password = input.password;

    bcrypt.genSalt(5, function(err, salt){
        if(err) return callback(err);

        bcrypt.hash(password, salt, null, function(err, hash){
            if(err) return callback(err);
            password = hash;
            //callback();
        });
    });

    req.getConnection(function(err, connection){

        if(err) return next(err);

        //var query = connection.query('UPDATE employees SET birth_date=?, first_name=?, last_name=?, gender=?, hire_date=? WHERE emp_no = ?;', [input.birth_date, input.first_name, input.last_name, input.gender, input.hire_date, emp_no], function(err, results){
        var query = connection.query('UPDATE User SET name=?, email=?, password=? WHERE userId = ?;', [input.name, input.email, password, userID], function(err, results){
            //var query = connection.query('UPDATE Event SET title=?, startDate=?, endDate=?, isAllDay=?, description=?, location=?, userId=? WHERE eventId = ?;', [input.birth_date, input.first_name, input.last_name, input.gender, input.hire_date, emp_no], function(err, results){

            if(err) return next(err);

            res.json({message: 'User Updated'});

        });

        console.log(query.sql);

    });

    console.log(input);
};

module.exports.destroy = function(req, res, next){

    var userID = req.params.userID;

    req.getConnection(function(err,connection){

        if(err) return next(err);

        var query = connection.query('DELETE FROM User WHERE userId = ?;', [userID], function(err, results){

            if(err) return next(err);

            res.json({message: 'User Deleted'});

        });

        console.log(query.sql);

    });
};