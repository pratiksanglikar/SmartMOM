
var express = require("express");
var router = express.Router();
var momcore = require("../javascripts/watson/momcore");



router.get("/:filename", function (req, res, next) {
	var file = req.params.filename;
    console.log("file "+ file);
	var details =  momcore.getMOMByFileName(file);
    var details_json = {};
    details.done(function (result) {
        details_json = result;
        //console.log("details_json "+ JSON.stringify(details_json));
        res.render('details', {details: details_json, filename: file});
    }, function (error) {
		res.status(500).send({
			error: error
		});
	});
});



module.exports = router;