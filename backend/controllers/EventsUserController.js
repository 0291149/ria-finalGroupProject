/**
 * Created by inet2005 on 4/5/17.
 */

/**
 * Created by NSCC Student on 4/3/2017.
 */

var bcrypt = require('bcrypt-nodejs');

module.exports.login = function(req, res, next){

    var input = req.headers;

    var password = input.password;

    req.getConnection(function(err, connection){
        if (err) return next(err);

        var query = connection.query('SELECT * FROM User WHERE email=?;', [input.email], function(err, results){

            if(err) return next(err);

            if(results[0] == null || results[0].password == null) return next(err)

            bcrypt.compare(password, results[0].password, function(err, isMatch){
                if(err) return next(err);

                if(!isMatch)
                {
                    res.json({message: "There was an error processing your request"});
                }
                else
                {
                    res.json(results[0]);
                }

            });


        });

        console.log(query.sql);

    });


};

module.exports.index = function(req,res,next){
    req.getConnection(function(err,connection){
        if(err) return next(err);

        var userID = req.params.userID;

        var query = connection.query('SELECT * FROM Event WHERE userId=? ORDER BY startDate ASC;', [userID], function(err, results){
            if (err) return next(err);

            res.json(results);
        });

        console.log(query.sql);

    });
};

module.exports.show = function(req,res,next){
    var eventID = req.params.eventID;
    var userId = req.params.userID;

    req.getConnection(function(err, connection){
        if (err) return next(err);

        var query = connection.query('SELECT * FROM Event WHERE eventId = ? AND userId = ?', [eventID, userId], function(err, results){

            if(err) return next(err);

            res.json(results[0]);

        });

        console.log(query.sql);

    });

};

module.exports.store = function(req,res,next){

    var userID = req.params.userID;
    var input = req.body;

    req.getConnection(function(err, connection){

        if(err) return next(err);

        var query = connection.query('INSERT INTO Event (title, startDate, endDate, isAllDay, description, location, userId) VALUES (?,?,?,?,?,?,?);',[input.title, input.startDate, input.endDate, input.isAllDay, input.description, input.location, userID], function(err, results){

            if(err) return next(err);

            res.json({message: 'Event Created'});

        });

        console.log(query.sql);

    });

};

module.exports.update = function(req,res,next){

    var eventID = req.params.eventID;
    var userID = req.params.userID;
    var input = req.body;

    req.getConnection(function(err, connection){

        if(err) return next(err);

        //var query = connection.query('UPDATE employees SET birth_date=?, first_name=?, last_name=?, gender=?, hire_date=? WHERE emp_no = ?;', [input.birth_date, input.first_name, input.last_name, input.gender, input.hire_date, emp_no], function(err, results){
        var query = connection.query('UPDATE Event SET title=?, startDate=?, endDate=?, isAllDay=?, description=?, location=? WHERE eventId = ? AND userId = ?;', [input.title, input.startDate, input.endDate, input.isAllDay, input.description, input.location, eventID, userID], function(err, results){
            //var query = connection.query('UPDATE Event SET title=?, startDate=?, endDate=?, isAllDay=?, description=?, location=?, userId=? WHERE eventId = ?;', [input.birth_date, input.first_name, input.last_name, input.gender, input.hire_date, emp_no], function(err, results){

            if(err) return next(err);

            res.json({message: 'Event Updated'});

        });

        console.log(query.sql);

    });

    console.log(input);
};

module.exports.destroy = function(req, res, next){

    var eventID = req.params.eventID;
    var userID = req.params.userID;

    req.getConnection(function(err,connection){

        if(err) return next(err);

        var query = connection.query('DELETE FROM Event WHERE EventId = ? AND UserId = ?;', [eventID, userID], function(err, results){

            if(err) return next(err);

            res.json({message: 'Event Deleted'});

        });

        console.log(query.sql);

    });
};
