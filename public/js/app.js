/**
 * Created by pratiksanglikar on 20/04/16.
 */
var app = angular.module("SmartMOM", ["ngRoute","kendo.directives"]);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider.when("/record", {
		templateUrl: "partials/record.html",
		controller: "RecordingController"
	}).otherwise({
		redirectTo: "/index"
	});
	$locationProvider.html5Mode(true);
});