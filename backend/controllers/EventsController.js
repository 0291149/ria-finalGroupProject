/**
 * Created by NSCC Student on 4/3/2017.
 */

module.exports.index = function(req,res,next){
    req.getConnection(function(err,connection){
        if(err) return next(err);

        var query = connection.query('SELECT * FROM Event;', [], function(err, results){
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

        var query = connection.
        query('INSERT INTO Event (title, startDate, endDate, isAllDay, description, location, userId) VALUES (?,?,?,?,?,?,?);',
            [input.title, input.startDate, input.endDate, input.isAllDay, input.description, input.location, input.userId],
        function(err, results){

            if(err) return next(err);

            res.json({message: 'Employee Created'});

        });

        console.log(query.sql);

    });

};

module.exports.update = function(req,res,next){
    var eventID = req.params.eventID;
    var input = req.body;

    //req.getConnection(function)

    console.log(input);
};

module.exports.destroy = function(req, res, next){
    var eventID = req.params.eventID;

    console.log(eventID);
};