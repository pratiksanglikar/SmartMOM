
var express = require("express");
var router = express.Router();
var momcore = require("../javascripts/authentication/momcore");



router.get("/:filename", function (req, res, next) {
	var file = req.params.filename;
	var details =  momcore.getMOMByFileName(file);
	res.render('details', {details: details});
	//res.download(file);
});



module.exports = router;