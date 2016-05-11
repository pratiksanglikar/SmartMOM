
var express = require("express");
var router = express.Router();
//var Auth = require("../javascripts/authentication/Auth");



router.get("/:filename", function (req, res, next) {
	var file = req.params.filename;
	res.render('details');
	//res.download(file);
});



module.exports = router;