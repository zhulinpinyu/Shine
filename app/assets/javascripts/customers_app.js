var app = angular.module('customers',[
  'ngRoute',
  'templates'
]);
app.config(function($routeProvider){
  $routeProvider.when('/',{
    controller: "CustomerSearchCtrl",
    templateUrl: "customer_search.html"
  });
});

app.controller('CustomerSearchCtrl',function($scope,$http){
  var page = 0;
  $scope.customers = [];
  $scope.search = function(searchTerm){
    if(searchTerm.length > 1){
      $http.get('/customers.json',
        {
          "params": {
            "keywords": searchTerm,
            "page": page
          }
        }
      ).then(function(response){
        $scope.customers = response.data;
      });
    }
  };
  $scope.previousPage = function(){
    if(page > 0){
      page = page - 1;
      $scope.search($scope.keywords)
    }
  };
  $scope.nextPage = function(){
    page = page + 1;
    $scope.search($scope.keywords)
  }
});
