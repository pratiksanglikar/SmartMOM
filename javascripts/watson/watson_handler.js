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
	audio: fs.createReadStream('uploads/sample1.wav'),
	content_type: 'audio/wav',
	timestamps: true,
	word_alternatives: 0.9,
	continuous: true
};


exports.postToWatson = function () {
	speech_to_text.recognize(params, function(err, transcript) {
		if (err){
			console.log(err);
		}
		else
		{
			var transJson = JSON.stringify(transcript, null, 2);
			//console.log(transJson);
			console.log(transcript.results[0].alternatives[0].transcript);
			alchemy.sentiment({
				text: "What about I told you since the first day you stepped into my. There are three ways to make a living in this biz. First. The smaller. Or cheat. I don't cheat. I don't know I like to think we have some pretty smart people in this building. Sure is a hell of a lot easier to just be first. So it all today. Saudi impossible son. Yes but at what cost. I have to pay. Really. I think so. Where is this going to come back to us. Everywhere. Sam I don't think you seem to understand what your boy is just sad. I made. How would you do. Well you call the traders in for the normal six thirty meeting to be honest with them because they're going to know it's the end either way. So you gonna have to throw me a bone in a pretty big one. And then you've got to come out of the gate storming. No swaps no nothing. Forty percent done by ten fifteen by eleven o'clock all your trades have to be gone because by lunch time words going to be out. And by two o'clock you gonna be selling at sixty five cents on the dollar if you're lucky. And then the feds going to be in here up your **** trying to slow you down. Ramesh and slow you down. You can't stop you. Just to sell. But John. Even if. We managed to. Pull that off in that sang some. The real question is. Who is selling the sting. Same people will be senator over the last two years and whoever else by. John. If you do this. You will kill the market for years it's over. And you're selling something that you know has no value. We are selling to willing buyers of the car and found market price. So that we may survive you will never sell anything to any of those people ever again I understand do you. Do you. This is it. I'm telling you this is it. Nnj. I. Well. Fineness. "
			}, function (error, response) {
				if(error) {
					console.log("Error in Alchemy - " + error);
				} else {
					console.log("Response of Alchemy - " + JSON.stringify(response, null, 2));
				}
			});


			alchemy.relations({
				text: transcript.results[0].alternatives[0].transcript
			}, function (error, response) {
				if(error) {
					console.log("Error in Relations - " + error);
				} else {
					console.log("Response of Relations - " + JSON.stringify(response, null, 2));
				}
			});

			concepts_insights.graphs.annotateText({
				graph: '/graphs/wikipedia/en-latest',
				text: "What about I told you since the first day you stepped into my. There are three ways to make a living in this biz. First. The smaller. Or cheat. I don't cheat. I don't know I like to think we have some pretty smart people in this building. Sure is a hell of a lot easier to just be first. So it all today. Saudi impossible son. Yes but at what cost. I have to pay. Really. I think so. Where is this going to come back to us. Everywhere. Sam I don't think you seem to understand what your boy is just sad. I made. How would you do. Well you call the traders in for the normal six thirty meeting to be honest with them because they're going to know it's the end either way. So you gonna have to throw me a bone in a pretty big one. And then you've got to come out of the gate storming. No swaps no nothing. Forty percent done by ten fifteen by eleven o'clock all your trades have to be gone because by lunch time words going to be out. And by two o'clock you gonna be selling at sixty five cents on the dollar if you're lucky. And then the feds going to be in here up your **** trying to slow you down. Ramesh and slow you down. You can't stop you. Just to sell. But John. Even if. We managed to. Pull that off in that sang some. The real question is. Who is selling the sting. Same people will be senator over the last two years and whoever else by. John. If you do this. You will kill the market for years it's over. And you're selling something that you know has no value. We are selling to willing buyers of the car and found market price. So that we may survive you will never sell anything to any of those people ever again I understand do you. Do you. This is it. I'm telling you this is it. Nnj. I. Well. Fineness. "
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
