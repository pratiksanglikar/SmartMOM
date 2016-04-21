/**
 * Created by pratiksanglikar on 20/04/16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/index', function(req, res, next) {
	res.render('index');
});

module.exports = router;
