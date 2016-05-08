/**
 * Created by pratiksanglikar on 20/04/16.
 */
var express = require('express');
var router = express.Router();
var crypto = require("crypto");
var multer = require('multer');
var watson_handler = require("../javascripts/watson/watson_handler");
/*var storage = multer.diskStorage({
	destination:  './uploads/',
	filename: function (req, file, cb) {
		crypto.pseudoRandomBytes(16, function (err, raw) {
			if (err)
				return cb(err);
			cb(null, raw.toString('hex') + ".wav");
		});
	}
});*/

var storage = multer.diskStorage({
	destination:  './uploads/',
	filename: function (req, file, cb) {
		crypto.pseudoRandomBytes(16, function (err, raw) {
			if (err) {
				return cb(err);
			}
			cb(null, "sample.wav");
		});
	}
});

var upload = multer({
		storage: storage
	}).single('file');

/* GET home page. */
router.get('/', function(req, res) {
	res.redirect('/#record');
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