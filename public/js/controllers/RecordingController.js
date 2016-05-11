/**
 * Created by pratiksanglikar on 20/04/16.
 */
var app = angular.module("SmartMOM");

app.controller("RecordingController", ["$scope", "$http",function ($scope, $http) {
	init = function () {
		$http({
			method: 'GET',
			url: '/recordings/all'
		}).then(function (result) {
			$scope.files = _processData(result.data);
			$scope.filegrid.refresh();
		}).catch(function(error) {
			alert("Some error occurred!");
		});
	};
	init();
	_processData = function (array) {
		var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		for(var i = 0 ; i < array.length; i++) {
			var newDate = new Date(array[i].created_on);
			var dateString = "";
			var date = "0" + newDate.getUTCDate();
			date = date.substr(date.length-2);
			var hours = "0" + newDate.getUTCHours();
			hours = hours.substr(hours.length-2);

			var minutes = "0" + newDate.getUTCMinutes();
			minutes = minutes.substr(minutes.length-2);

			var seconds = "0" + newDate.getUTCSeconds();
			seconds = seconds.substr(seconds.length-2);

			dateString += months[newDate.getUTCMonth()] + " " + date + ", " + newDate.getUTCFullYear();
			dateString += " " + hours + ":" + minutes + ":" + seconds;
			array[i].created_on = dateString;
		}
		return array;
	};

	$scope.detailGridOptions = {
		dataSource: $scope.files,
		sortable: true,
		columns: [
			{ field: "author", title:"Author", width: "15rem" },
			{ field: "filename", title:"File Name", width: "15rem" },
			{ field: "created_on", title:"Creation Date", width: "15rem" }
		],
		rowTemplate: "<tr><td><div class='author file-row'>#:author#</div></td>" +
		"<td><a href=#:'/details/' + filename # class='filename file-row' target='_blank'>#:filename#</a></td>" +
		"<td><div class='created_on file-row'>#:created_on#</div></td></tr>"
	};

	$scope.showDetails = function (filename) {
		alert(filename);
	};
}]);