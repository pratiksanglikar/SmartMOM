/**
 * Created by pratiksanglikar on 09/05/16.
 */
var express = require("express");
var router = express.Router();
var Auth = require("../javascripts/authentication/Auth");

router.post("/login", function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	var promise = Auth.login(username, password);
	promise.done(function (user) {
		req.session.user = user;
		delete user.password;
		res.send(user);
	}, function (error) {
		res.status(401).send({
			error: error
		});
	})
});



module.exports = router;