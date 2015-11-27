describe("CustomerSearchCtrl",function(){
  describe("Initialization", function(){
    var scope = null ,ctrl = null;
    beforeEach(module("customers"));
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
    var scope = null,
        ctrl = null,
        httpBackend = null,
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
    beforeEach(module("customers"));
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
