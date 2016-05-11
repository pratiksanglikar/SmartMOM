/**
 * Created by pratiksanglikar on 10/05/16.
 */

var MongoDB = require("../commons/mongodbhandler");
var Q = require("q");

exports.addNewFile = function (username, filename, timestamp) {
	var deferred = Q.defer();
	MongoDB.collection("files").insert({
		author: username,
		filename: filename,
		created_on: timestamp
	}).then(function () {
		deferred.resolve(filename);
	}).catch(function (error) {
		deferred.reject(error);
	});
	return deferred.promise;
}

exports.getFilesByUserName = function (username) {
	var deferred = Q.defer();
	var files = [];
	var cursor = MongoDB.collection("files").find({
		author: username
	});
	cursor.each( function (error, doc) {
		if(error){
			deferred.reject(error);
		}
		if(doc != null) {
			files.push(doc);
		} else {
			deferred.resolve(files);
		}
	});
	return deferred.promise;
}

exports.getMOMByFileName = function (filename) {
	var deferred = Q.defer();
	var mom = null;
	var cursor = MongoDB.collection("mom").find({
		filename: filename
	});
	cursor.each(function (error, doc) {
		if(error) {
			deferred.reject(error);
		} else {
			if(doc != null) {
				mom = doc;
			} else {
				if(mom) {
					deferred.resolve(mom);
				} else {
					deferred.reject("Minutes of meeting not found for " + filename);
				}
			}
		}
	});
	return deferred.promise;
}

exports.getAllFiles = function (user) {
	var deferred = Q.defer();
	var files = [];
	if(!user) {
		deferred.reject("Bad Request");
		return deferred.promise();
	}
	var cursor = MongoDB.collection("files").find({
		author: user.username
	});
	cursor.each(function (error, doc) {
		if(error) {
			deferred.reject(error);
		} else {
			if(doc != null) {
				files.push(doc);
			} else {
				deferred.resolve(files);
			}
		}
	});
	return deferred.promise;
}