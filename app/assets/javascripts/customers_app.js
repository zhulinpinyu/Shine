var app = angular.module('customers',[]);
app.controller('CustomerSearchCtrl',function($scope,$http){
  $scope.search = function(searchTerm){
    $scope.searchedFor = searchTerm;
    $http.get('/customers.json',{"params":{"keywords": searchTerm}})
    .then(function(response){
      $scope.customers = response.data;
    });
  }
});
