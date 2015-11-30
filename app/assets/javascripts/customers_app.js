var app = angular.module('customers',[
  'ngRoute',
  'ngResource',
  'ngMessages',
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
  $scope.customer_id = $routeParams.id;
  $scope.customer = {};
  var Customer = $resource('customers/:customerId.json');
  $scope.customer = Customer.get({"customerId": $scope.customer_id});
  $scope.save = function() {
    if($scope.form.$valid){
      alert("Save!");
    }
  }
});

app.controller('CustomerCreditCardCtrl', function($scope,$resource){
  var CreditCardInfo = $resource('/fake_billing.json')
  $scope.setCardholderId = function(cardholderId){
    $scope.creditCard = CreditCardInfo.get({"cardholder_id": cardholderId});
  }
});
