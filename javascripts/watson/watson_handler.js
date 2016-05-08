/**
 * Created by pratiksanglikar on 05/05/16.
 */
var watson = require('watson-developer-cloud');
var fs = require("fs-extra");
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
	audio: fs.createReadStream('uploads/sample2.wav'),
	content_type: 'audio/wav',
	timestamps: true,
	word_alternatives: 0.9,
	continuous: true
};


exports.postToWatson = function () {
	speech_to_text.recognize(params, function(err, transcript) {
		if (err){
			console.log("Error while uploading sound - " + err);
		}
		else
		{
			var finalTextString = "";
			//console.log(transcript.results[0].alternatives[0].transcript);
			for(var i = 0; i < transcript.results.length; i++) {
				finalTextString += transcript.results[i].alternatives[0].transcript;
			}
			console.log("Formed String : " + finalTextString);
			alchemy.sentiment({
				text: finalTextString
			}, function (error, response) {
				if(error) {
					console.log("Error in Sentiment - " + error);
				} else {
					console.log("Response of Sentiment - " + JSON.stringify(response, null, 2));
				}
			});


			alchemy.relations({
				/*text: finalTextString*/
				text: "hi my name is mark mark until glad to meet you yeah so are you from I'm from Houston Texas all I'm from southern California what year are you I'm a freshman this is my first year to so make you decide to come to California for school I hear Austin is a good school Sir right but I think Berkeley's better so is this where you want to come tell you the truth I want to go to Stanford I made it on the waiting list but ninety nine percent of the people accepted to Stanford go there like who wouldn't right very true but this is still a good school I'm not complaining I just know that I want to come to California Texas is cool and all but I wanted to experience different things that's good do you know what you plan on majoring in I was thinking about political science but now I'm leaning towards English literature how about you I plan on majoring in double the do you know where the Smith building is I have to pick up the syllabus for my psychology class I missed the first day that's a great start it's over there by the library it was nice meeting you yeah should hang out later cool assist morning class then alright later"
			}, function (error, response) {
				if(error) {
					console.log("Error in Relations - " + error);
				} else {
					console.log("Response of Relations - " + JSON.stringify(response, null, 2));
				}
			});

			concepts_insights.graphs.annotateText({
				graph: '/graphs/wikipedia/en-latest',
				text: finalTextString
			}, function(err, res) {
				if (err)
					console.log(err);
				else {
					console.log(JSON.stringify(res, null, 2));
				}
			});
		}
	});
}
