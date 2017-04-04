/**
 * Created by NSCC Student on 4/3/2017.
 */

module.exports.index = function(req,res,next){
    req.getConnection(function(err,connection){
        if(err) return next(err);

        var query = connection.query('SELECT * FROM Event ORDER BY startDate ASC;', [], function(err, results){
            if (err) return next(err);

            res.json(results);
        });

        console.log(query.sql);

    });
};

module.exports.show = function(req,res,next){
    var eventID = req.params.eventID;

    req.getConnection(function(err, connection){
        if (err) return next(err);

        var query = connection.query('SELECT * FROM Event WHERE eventId = ?', [eventID], function(err, results){

            if(err) return next(err);

            res.json(results[0]);

        });

        console.log(query.sql);

    });

};

module.exports.store = function(req,res,next){

    var input = req.body;

    req.getConnection(function(err, connection){

        if(err) return next(err);

        var query = connection.query('INSERT INTO Event (title, startDate, endDate, isAllDay, description, location, userId) VALUES (?,?,?,?,?,?,?);',[input.title, input.startDate, input.endDate, input.isAllDay, input.description, input.location, input.userId], function(err, results){

            if(err) return next(err);

            res.json({message: 'Event Created'});

        });

        console.log(query.sql);

    });

};

module.exports.update = function(req,res,next){

    var eventID = req.params.eventID;
    var input = req.body;

    req.getConnection(function(err, connection){

        if(err) return next(err);

        //var query = connection.query('UPDATE employees SET birth_date=?, first_name=?, last_name=?, gender=?, hire_date=? WHERE emp_no = ?;', [input.birth_date, input.first_name, input.last_name, input.gender, input.hire_date, emp_no], function(err, results){
        var query = connection.query('UPDATE Event SET title=?, startDate=?, endDate=?, isAllDay=?, description=?, location=?, userId=? WHERE eventId = ?;', [input.title, input.startDate, input.endDate, input.isAllDay, input.description, input.location, input.userId, eventID], function(err, results){
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

    req.getConnection(function(err,connection){

        if(err) return next(err);

        var query = connection.query('DELETE FROM Event WHERE eventId = ?;', [eventID], function(err, results){

            if(err) return next(err);

            res.json({message: 'Event Deleted'});

        });

        console.log(query.sql);

    });
};