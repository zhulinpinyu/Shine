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
});
