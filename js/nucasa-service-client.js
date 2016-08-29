var propertyId =0;
//var baseurl = 'http://localhost:8080';
var baseurl = 'http://nookcasa-env.us-west-2.elasticbeanstalk.com';

function test(id){
	//alert(id);
	//propertyId = id;
}

function getParameter(param) {
    var val = document.URL;
    var url = val.substr(val.indexOf(param))  
    propertyId=parseInt(url.replace(param+"=",""));
    //alert(propertyId); 
}

var app = angular.module('nookcasaBid', []);
app.controller('propertyDetailsController', function($scope, $http) {
	getParameter("propertyId");
	var url1 = baseurl+'/propertyDetails/' + propertyId;
	// alert(url1);
	$http.get(url1).then(function(response) {
		$scope.propertyDetails = response.data;
	});

	var url2 = baseurl+'/maxBidPrice/' + propertyId;
	// alert(url2);
	$http.get(url2).then(function(response) {
		$scope.maxBidPrice = response.data;
	});

	$scope.defaultbid = {"bidPrice":"Bid Price","userId":"User Id","proposal":"Message to landlord"};
	$scope.registerBid = function(){
		//var queryParams = '?propertyId='+propertyId+'&price='+$scope.bid.bidPrice+'&userId=+'$scope.bid.userId+'&proposal='+$scope.bid.proposal;
		//var url3 = 'http://localhost:8080/maxBidPrice/registerBid'+queryParams;
		//alert(url3);
		var url3 = baseurl+'/registerBid?propertyId='+propertyId+'&price='+$scope.bid.bidPrice+'&userId='+$scope.bid.userId+'&proposal='+$scope.bid.proposal;
		$http.get(url3).then(function(response) {
			$scope.bidresponse = response.data;
			if($scope.bidresponse){
				alert("Your bid was placed successfully");
				location.reload();
			}else{
				alert("Your bid could not be places. There was an internal server error");
				location.reload();
			}
		}, 
	    function(response) { // optional
			alert("Your bid could not be places. There was an internal server error");
			location.reload();
	    });
		$scope.bid = angular.copy($scope.defaultbid);
	};

});

var app = angular.module('nookcasaMain', []);
app.controller('propertiesListController', function($scope, $http) {
  $http.get(baseurl+"/properties")
  .then(function(response) {
      $scope.properties = response.data;
  });
});