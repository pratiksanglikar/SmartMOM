/**
 * Created by pratiksanglikar on 20/04/16.
 */
var app = angular.module("SmartMOM", ["ngRoute","kendo.directives","angularAudioRecorder"]);

app.config(["$routeProvider","$locationProvider","recorderServiceProvider",function ($routeProvider, $locationProvider, RecorderServiceProvider) {
	$routeProvider.when("/record", {
		templateUrl: "partials/record.html",
		controller: "RecordingController"
	}).otherwise({
		redirectTo: "/record"
	});
	$locationProvider.html5Mode(true);
	RecorderServiceProvider.withMp3Conversion(false);
}]);