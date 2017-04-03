/**
 * Created by NSCC Student on 4/3/2017.
 */

module.exports.index = function(req,res,next){
    console.log("In the GET method");
};

module.exports.show = function(req,res,next){
    console.log("In the GET method on id");
};

module.exports.store = function(req,res,next){
    var input = req.body;

    console.log(input)

};

module.exports.update = function(req,res,next){
    var eventID = req.params.eventID;
    var input = req.body;

    console.log(input);
};

module.exports.destroy = function(req, res, next){
    var eventID = req.params.eventID;

    console.log(eventID);
};