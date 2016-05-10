/**
 * Created by pratiksanglikar on 05/05/16.
 */
var watson = require('watson-developer-cloud');
var http = require('http');
var fs = require("fs-extra");
var speech_to_text = watson.speech_to_text({
	username: '6e6d52c9-92c1-4a8f-8328-bbcee6506aa0',
	password: '6tiSO3dgYd2X',
	version: 'v1'
});

var AlchemyAPI = require('alchemy-api');
var alchemyk = new AlchemyAPI('9c7053a8dd425dfbc3d15cfc4ed0e31b3650479e');


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

			// relationsalchemy.relations('hi my name is mark mark until glad to meet you',{
			// 	/*text: finalTextString*/
			// 	}, function (error, response) {
			// 	if(error) {
			// 		console.log("Error in Relations - " + error);
			// 	} else {
			// 		console.log("Response of Relations - " + JSON.stringify(response, null, 2));
			// 	}
			// });

			var finalTextStringReplaced = finalTextString.split('\'').join('');
			console.log("Replaced - " + finalTextStringReplaced);
			//path: '/calls/text/TextGetRelations?apikey=9c7053a8dd425dfbc3d15cfc4ed0e31b3650479e&text=The%20more%20things%20change...%20Yes,%20I%27m%20inclined%20to%20agree,%20especially%20with%20regards%20to%20the%20historical%20relationship%20between%20stock%20prices%20and%20bond%20yields.%20The%20two%20have%20generally%20traded%20together,%20rising%20during%20periods%20of%20economic%20growth%20and%20falling%20during%20periods%20of%20contraction.%20Consider%20the%20period%20from%201998%20through%202010,%20during%20which%20the%20U.S.%20economy%20experienced%20two%20expansions%20as%20well%20as%20two%20recessions:%20Then%20central%20banks%20came%20to%20the%20rescue.%20Fed%20Chairman%20Ben%20Bernanke%20led%20from%20Washington%20with%20the%20help%20of%20the%20bank%27s%20current%20$3.6T%20balance%20sheet.%20He%27s%20accompanied%20by%20Mario%20Draghi%20at%20the%20European%20Central%20Bank%20and%20an%20equally%20forthright%20Shinzo%20Abe%20in%20Japan.%20Their%20coordinated%20monetary%20expansion%20has%20provided%20all%20the%20sugar%20needed%20for%20an%20equities%20moonshot,%20while%20they%20vowed%20to%20hold%20global%20borrowing%20costs%20at%20record%20lows.&outputMode=json'
			var tpath = '/calls/text/TextGetRelations?apikey=9c7053a8dd425dfbc3d15cfc4ed0e31b3650479e&text='+finalTextStringReplaced+'&outputMode=json';
			console.log("tpath - " + tpath);

			/*http.get({
				host: 'access.alchemyapi.com',
				path: tpath
			}, function(response) {
				// Continuously update stream with data
				var body = '';
				response.on('data', function(d) {
					body += d;
				});
				response.on('end', function() {

					// Data reception is done, do whatever with it!
					var parsed = JSON.parse(body);
					console.log("Response of Relations - " + JSON.stringify(parsed));
				});
			});*/


			//alchemyk.relations("by the library I'm it was nice meeting you yeah should hang out later cool assist morning class then alright later. I'm a good boy",
			finalTextString = "by the library I'm it was nice meeting you yeah should hang out later cool assist morning class then alright later. I'm a good boy";
			console.log("FIN : " + finalTextString);
			alchemyk.relations(finalTextString,
				{},
				function(err, response) {
				if (err) throw err;

				// See http://www.alchemyapi.com/api/relation/htmlc.html for format of returned object
				var relations = response.relations;

				console.log("New relation"+JSON.stringify(response, null, 2));

				// Do something with data
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
