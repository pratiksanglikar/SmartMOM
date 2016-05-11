/**
 * Created by pratiksanglikar on 05/05/16.
 */
var watson = require('watson-developer-cloud');
var http = require('http');
var fs = require("fs-extra");
var Q = require("q");

var MongoDB = require("../commons/mongodbhandler");

var AlchemyAPI = require('alchemy-api');
var alchemyk = new AlchemyAPI('9c7053a8dd425dfbc3d15cfc4ed0e31b3650479e');
var speech_to_text = watson.speech_to_text({
	username: '6e6d52c9-92c1-4a8f-8328-bbcee6506aa0',
	password: '6tiSO3dgYd2X',
	version: 'v1'
});

var alchemy = watson.alchemy_language({
	api_key: "9c7053a8dd425dfbc3d15cfc4ed0e31b3650479e"
});

var concepts_insights = watson.concept_insights({
	password: "D5fXuDXGR47k",
	username: "68bbca6b-2a76-42e8-99ed-dbd9c95805db",
	version: "v2"
});

var params = {
	content_type: 'audio/wav',
	timestamps: true,
	word_alternatives: 0.9,
	continuous: true
};


exports.postToWatson = function (filename) {
	var deferred = Q.defer();
	var promises = [];
	params.audio = fs.createReadStream("uploads/" + filename);

	speech_to_text.recognize(params, function(err, transcript) {
		var mom = {};
		if (err) {
			console.log("Error while uploading sound - " + err);
			deferred.reject(err);
		}
		else
		{
			var finalTextString = "";
			for(var i = 0; i < transcript.results.length; i++) {
				finalTextString += transcript.results[i].alternatives[0].transcript;
			}
			var finalTextStringReplaced = finalTextString.split('\'').join('');
			promises.push(exports.getSentiments(finalTextStringReplaced));
			promises.push(exports.getRelations(finalTextStringReplaced));
			promises.push(exports.getCoreConcepts(finalTextStringReplaced));
			Q.all(promises).done(function (values) {
				mom.sentiments = values[0];
				mom.relations = values[1];
				mom.coreconcepts = values[2];
				mom.filename = filename;
				mom.transcript = finalTextString;
				MongoDB.collection("mom").insert(mom).then(function () {
					deferred.resolve(mom);
				}).catch(function (error) {
					deferred.reject(error);
				});
			}, function (error) {
				deferred.reject(error);
			});
		}
	});
}

exports.getSentiments = function (finalTextString) {
	var deferred = Q.defer();
	alchemy.sentiment({
		text: finalTextString
	}, function (error, response) {
		if(error) {
			console.log("Error in Sentiment - " + error);
			deferred.reject(error);
		} else {
			deferred.resolve(response);
		}
	});
	return deferred.promise;
}

exports.getRelations = function (finalTextString) {
	var deferred = Q.defer();
	alchemyk.relations(finalTextString, {}, function(err, response) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(response.relations);
			}
		});
	return deferred.promise;
}

exports.getCoreConcepts = function(finalTextString) {
	var deferred = Q.defer();
	concepts_insights.graphs.annotateText({
		graph: '/graphs/wikipedia/en-latest',
		text: finalTextString
	}, function(err, res) {
		if (err){
			console.log(err);
			deferred.reject(err);
		}
		else {
			//console.log(JSON.stringify(res, null, 2));
			deferred.resolve(res);
		}
	});
	return deferred.promise;
}
