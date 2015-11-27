describe("CustomerSearchCtrl",function(){
  var scope = null ,ctrl = null;
  beforeEach(module("customers"));
  describe("Initialization", function(){
    beforeEach(inject(function($controller, $rootScope){
      scope = $rootScope.$new();
      ctrl = $controller("CustomerSearchCtrl",{
        $scope: scope
      });
    }));

    it("defaults to an empty customer list", function(){
      expect(scope.customers).toEqualData([]);
    });
  });

  describe("Fetching Search Results", function(){
    var httpBackend = null,
        serverResults = [
          {
            id: 123,
            first_name: "Bob",
            last_name: "Jones",
            email: "bjones@foo.net",
            username: "jonesy"
          },
          {
            id: 456,
            first_name: "Bob",
            last_name: "Johnsons",
            email: "johnboy@bar.info",
            username: "bobbyj"
          }
        ];
    beforeEach(inject(function($controller, $rootScope, $httpBackend){
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      ctrl = $controller("CustomerSearchCtrl",{
        $scope: scope
      })
    }));
    beforeEach(function(){
      httpBackend.when('GET','/customers.json?keywords=bob&page=0').respond(serverResults);
    });

    it("populates the customer list with the results",function(){
      scope.search("bob");
      httpBackend.flush();
      expect(scope.customers).toEqualData(serverResults);
    });
  });

});

describe("CustomerDetailCtrl",function(){
  describe("Initialization",function(){
    var scope = null,
        ctrl = null,
        id = 42,
        httpBackend = null,
        customer = {
          id: id,
          first_name: "Bob",
          last_name: "Jones",
          username: "bob.jones",
          email: "bobbyj@somewhere.net",
          created_at: "2014-01-03T11:12:34"
        };

    beforeEach(module("customers"));
    beforeEach(inject(function($controller,
                               $rootScope,
                               $routeParams,
                               $httpBackend){
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      $routeParams.id = id;
      httpBackend.when('GET','/customers/'+id+'.json').respond(customer);
      ctrl = $controller("CustomerDetailCtrl",{
        $scope: scope
      });
    }));
    it("fetches the customer from the back-end", function(){
      httpBackend.flush();
      expect(scope.customer).toEqualData(customer);
    });
  });
});
