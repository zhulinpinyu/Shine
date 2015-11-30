var app = angular.module('customers',[
  'ngRoute',
  'ngResource',
  'templates'
]);
app.config(function($routeProvider){
  $routeProvider.when('/',{
    controller: "CustomerSearchCtrl",
    templateUrl: "customer_search.html"
  });
  $routeProvider.when('/:id',{
    controller: "CustomerDetailCtrl",
    templateUrl: "customer_detail.html"
  });
});

app.controller('CustomerSearchCtrl',function($scope,$http, $location){
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
  $scope.viewDetails = function(customer){
    $location.path("/"+customer.id);
  }
});

app.controller('CustomerDetailCtrl',function($scope,$routeParams,$resource){
  var customerId = $routeParams.id;
  $scope.customer = {};
  var Customer = $resource('customers/:customerId.json');
  $scope.customer = Customer.get({"customerId": customerId});
});
