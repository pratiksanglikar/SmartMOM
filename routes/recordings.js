/**
 * Created by pratiksanglikar on 20/04/16.
 */
var express = require('express');
var router = express.Router();
var crypto = require("crypto");
var multer = require('multer');
var watson_handler = require("../javascripts/watson/watson_handler");
var momcore = require("../javascripts/watson/momcore");

var storage = multer.diskStorage({
	destination:  './uploads/',
	filename: function (req, file, cb) {
		var username = req.session.user.username || "test";
		var currentTime = new Date().getTime();
		var filename = username + currentTime + ".wav";
		var promise = momcore.addNewFile(username, filename, currentTime);
		promise.done(function (filename) {
			console.log("file " + filename + " inserted successfully");
			cb(null, filename);
		}, function (error) {
			cb(error, null);
		});
	}
});

var upload = multer({
		storage: storage
	}).single('file');

/* GET home page. */
router.get('/', function(req, res) {
	console.log("Got request");
	res.render('record');
});

router.post('/', upload, function(req, res) {
	res.send({
		status: "OK"
	});
});


router.get("/posttowatson", function (req, res) {
	console.log("Request got");
	watson_handler.postToWatson();
	res.send({
		status: "OK!"
	});
});

module.exports = router;