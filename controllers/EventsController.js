/**
 * Created by NSCC Student on 4/2/2017.
 */

module.exports.index = function(req, res, next) {
    console.log("In the GET method");



};

/*
 module.exports.index = function(req, res, next) {
 //console.log("In the GET method");

 req.getConnection(function(err, connection){

 if(err) return next(err);

 var query = connection.query('Select * FROM employees ORDER BY emp_no DESC LIMIT 0,10;', [], function(err, results){
 if (err) return next(err);

res.json(results);
});

console.log(query.sql);

});
};

module.exports.show = function(req, res){

    var emp_no = req.params.emp_no;

    req.getConnection(function(err, connection){

        if (err) return next(err);

        var query = connection.query('SELECT * FROM employees WHERE emp_no = ?;', [emp_no], function(err, results){

            if(err) return next(err);

            res.json(results[0]);

        });

        console.log(query.sql);

    });

};

module.exports.store = function(req, res, next) {
    //http://stackoverflow.com/questions/36744308/next-is-not-defined-but-i-dont-understand-how-to-define-it-in-my-function
    var input = req.body;

    //var emp_no = 0;

    req.getConnection(function(err, connection){

        if(err) return next(err);

        var query = connection.query('INSERT INTO employees (emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES (?,?,?,?,?,?);', [input.emp_no, input.birth_date, input.first_name, input.last_name, input.gender, input.hire_date], function(err, results){
            if(err) return next(err);

            res.json({message: 'Employee Created'});

        });

        console.log(query.sql);

    });

};

module.exports.update = function(req,res,next){

    var emp_no = req.params.emp_no;
    var input = req.body;

    req.getConnection(function(err,connection){

        if(err) return next(err);

        var query = connection.query('UPDATE employees SET birth_date=?, first_name=?, last_name=?, gender=?, hire_date=? WHERE emp_no = ?;', [input.birth_date, input.first_name, input.last_name, input.gender, input.hire_date, emp_no], function(err, results){

            if(err) return next(err);
            res.json({message: 'Actor Updated'});

        });

        console.log(query.sql);

    });

};

module.exports.destroy = function(req, res, next){

    var emp_no = req.params.emp_no;

    req.getConnection(function(err,connection){

        if(err) return next(err);

        var query = connection.query('DELETE FROM employees WHERE emp_no = ?;', [emp_no], function(err, results){

            if(err) return next(err);

            res.json({message: 'Actor Delete'});

        });

        console.log(query.sql);

    });

};
 */