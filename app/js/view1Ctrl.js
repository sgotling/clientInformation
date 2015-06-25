newProjectApp.controller('view1Ctrl', function ($http, $resource, $scope, $firebaseObject) {
	var ref = new Firebase('https://publicvoidmusic.firebaseio.com/');
    var firebase = $firebaseObject(ref);
    $scope.firebase;

    firebase.$bindTo($scope, 'firebase').then(function () {
    	if ($scope.firebase.clients === undefined) {
    		$scope.firebase['clients'] = {'test':'test'};
    	};
    	$scope.clients = $scope.firebase.clients;
    	var totalNumberOfVisitors = (Object.keys($scope.clients).length) - 1;
    	console.log('total numbers of visitors: ' + totalNumberOfVisitors);
    	$scope.getClientData();
    })
	$scope.getClientData = function () {
	    $http({
	        method: 'GET',
	        url: 'http://www.freegeoip.net/json/'
	    }).
	    success(function (data, status, headers, config) {
			var stringList = data.ip.split(".");
				var ip=stringList[0];
			for (var i = 1; i < stringList.length; i++) {
				ip = ip + ":" + stringList[i]
			};

			if ($scope.clients[ip] === undefined) {
				$scope.clients[ip] = {visits:1}
				$scope.clients[ip]['data'] = data
    			var d = new Date();
				$scope.clients[ip][d] = d;

			}
			else{
				$scope.clients[ip].visits +=1
				var d = new Date();
			}
	    }).
	    error(function (data, status, headers, config) {
	        console.log('error', status);
	    });
	}






});