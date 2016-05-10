/**
 * Created by pratiksanglikar on 09/05/16.
 */
//var MongoDB = require("../commons/mongodbhandler");
	var mongo = require("../commons/mongodbhandler");
var Q = require("q");

exports.login = function(username, password) {
	var user = null;
	var deferred = Q.defer();
	var cursor = mongo.collection("users").find({
		username: username
	});

	cursor.each(function (error, doc) {
		if(error) {
			deferred.reject(error);
		} else {
			if(doc === null) {
				if(user === null) {
					deferred.reject("User not found!");
				} else {
					if(user.password === password) {
						deferred.resolve(user);
					} else {
						deferred.reject("Invalid Password");
					}
				}
			} else {
				user = doc;
			}
		}
	});
	return deferred.promise;
}