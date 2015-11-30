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
      expect(scope.customer_id).toEqualData(customer.id)
      //httpBackend.flush();
      //expect(scope.customer).toEqualData(customer);
    });
  });
});
