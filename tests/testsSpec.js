
// node_modules/karma/bin/karma/karma start

'use strict';

var myApp = angular.module('myApp');
// console.log(myApp);


// run first test to check karma
describe('Simple test', function(){
  it("a is in fact 'hello world'", function(){
    var a = "Hello world";
    expect(a).toBe('Hello world');
  });
});
//------------------------

describe('Routes test new location test', function() {
    beforeEach(module('myApp'));
    var $location, $route, $rootScope;

    beforeEach(inject(function(_$location_, _$route_, _$rootScope_){
        $location = _$location_;
        $route = _$route_;
        $rootScope = _$rootScope_;
    }));

    // We need to setup a mock backend to handle the fetching of templates from the 'templateUrl'.
    beforeEach(inject(function($httpBackend){
        $httpBackend.expectGET('test/index').respond(200, 'test index HTML');
    }));

    // controller
    it('should load test index page', function(){
        expect($location.path()).toBe('/');

        $location.path('/test/aaa');
        $rootScope.$digest();

        expect($location.path()).toBe( '/test/aaa' );
        expect($route.current.controllerAs).toBe('ctrl');
    });

});

describe('Routes test about', function() {
    beforeEach(module('myApp'));
    var $location, $route, $rootScope;

    beforeEach(inject(function(_$location_, _$route_, _$rootScope_){
        $location = _$location_;
        $route = _$route_;
        $rootScope = _$rootScope_;
    }));

    // We need to setup a mock backend to handle the fetching of templates from the 'templateUrl'.
    beforeEach(inject(function($httpBackend){
        $httpBackend.expectGET('partials/about').respond(200, 'about HTML');
    }));

    // controller
    it('should load about page', function(){
        expect($location.path()).toBe('/');

        $location.path('/about');
        $rootScope.$digest();

        expect($location.path()).toBe( '/about' );
        expect($route.current.controller).toBe('AboutController');
    });

});
describe('Routes test', function() {
    // Mock our module in our tests
    beforeEach(module('myApp'));

    // We want to store a copy of the three services we'll use in our tests
    // so we can later reference these services in our tests.
    var $location, $route, $rootScope;

    // We added _ in our dependencies to avoid conflicting with our variables.
    // Angularjs will strip out the _ and inject the dependencies.
    beforeEach(inject(function(_$location_, _$route_, _$rootScope_){
        $location = _$location_;
        $route = _$route_;
        $rootScope = _$rootScope_;
    }));

    // We need to setup a mock backend to handle the fetching of templates from the 'templateUrl'.
    beforeEach(inject(function($httpBackend){
        $httpBackend.expectGET('partials/home').respond(200, 'main HTML');
        // or we can use $templateCache service to store the template.
        // $routeProvider will search for the template in the $templateCache first
        // before fetching it using http
        // $templateCache.put('templates/main.html', 'main HTML');
    }));

    // Our test code is set up. We can now start writing the tests.

    // When a user navigates to the index page, they are shown the index page with the proper
    // assuming the usual inject beforeEach for $route etc.

    // controller
    it('should load the index page on successful load of /', function(){
        expect($location.path()).toBe('/');

        $location.path('/');

        // The router works with the digest lifecycle, wherein after the location is set,
        // it takes a single digest loop cycle to process the route,
        // transform the page content, and finish the routing.
        // In order to trigger the location request, we’ll run a digest cycle (on the $rootScope)
        // and check that the controller is as expected.
        $rootScope.$digest();

        expect($location.path()).toBe( '/' );
        expect($route.current.controller).toBe('MainController');
    });

});
describe('Routes failure test', function() {
    beforeEach(module('myApp'));
    var $location, $route, $rootScope;

    beforeEach(inject(function(_$location_, _$route_, _$rootScope_){
        $location = _$location_;
        $route = _$route_;
        $rootScope = _$rootScope_;
    }));

    // We need to setup a mock backend to handle the fetching of templates from the 'templateUrl'.
    beforeEach(inject(function($httpBackend){
        $httpBackend.expectGET('partials/error').respond(200, 'error HTML');
    }));

    // controller
    it('should load the error page on unknown location', function(){
        expect($location.path()).toBe('/');

        $location.path('/lkdjafd/unknown-route');
        $rootScope.$digest();

        expect($location.path()).toBe( '/error' );
        expect($route.current.controller).toBe('ErrorController');
    });

});

describe('Testing Routes', function () {

  // load the controller's module
  beforeEach(angular.mock.module('myApp'));

  it('should test routes',
  inject(function ($route, $location, $http) {

    expect($route.routes['/'].controller).toBe('MainController');
    expect($route.routes['/'].templateUrl).toEqual('partials/home');

    expect($route.routes[null].redirectTo).toEqual('/error');
  }));

});

it('should map routes to controllers', function() {
  module('myApp');

  inject(function($route, $location, $http) {

    expect($route.routes['/'].controller).toBe('MainController');
    expect($route.routes['/about'].templateUrl).
      toEqual('partials/about');

    // otherwise redirect to
    expect($route.routes[null].redirectTo).toEqual('/error');
    // expect($route.routes['/afff']). toEqual(undefined);
    expect($route.routes['/afff']).toBeUndefined();

    $location.path('/CMS/tasks');
    // $rootScope.$digest();
    // console.log($route.routes['/CMS/tasks'])
    expect($route.routes['/CMS/tasks'].controller).toBe('TasksController');
    expect($route.routes['/CMS/tasks'].controllerAs).toBe('tCtrl');
    expect($route.routes['/CMS/tasks'].templateUrl).toBe('tasks/index');

  });
});

describe('Testing routes', function() {
  beforeEach(module('myApp'));

  var location, route, rootScope;

  beforeEach(inject(
      function( _$location_, _$route_, _$rootScope_ ) {
          location = _$location_;
          route = _$route_;
          rootScope = _$rootScope_;
  }));

   describe('Login route', function() {
      beforeEach(inject(
          function($httpBackend) {
              $httpBackend.expectGET('auth/login')
              .respond(200);
          }));

      it('should load the login page on successful load of /login', function() {
          location.path('/login');
          rootScope.$digest();
          expect(route.current.controller).toBe('loginController')
      });
  });
});
//------------------------

describe('MainController', function () {
  // register an instance
  beforeEach(angular.mock.module('myApp'));

  var $controller;
  // use the $controller service to get an instance of controller
  beforeEach(angular.mock.inject(function(_$controller_){
    $controller = _$controller_;
  }));
  describe('instance', function () {
    it('should have instance page defined', function () {
      var instance = {};

      var controller = $controller('MainController');

      expect(controller.page).toEqual("home");
      expect(controller.message).toEqual("This is home page");
      expect(controller.title).toEqual("TeamCo");
      expect(instance.message).not.toBe(null);
    });


  });

});

describe('AboutController', function () {
  // register an instance
  beforeEach(angular.mock.module('myApp'));

  var $controller;

  beforeEach(angular.mock.inject(function(_$controller_){
    $controller = _$controller_;
  }));
  describe('instance', function () {
    it('should have instance page defined', function () {
      var instance = {};

      var controller = $controller('AboutController');

      expect(controller.page).toEqual("about");
      expect(controller.title).toEqual("About Us");
      expect(instance.message).not.toBe(null);
    });


  });

});

describe('ContactController', function () {
  // register an instance
  beforeEach(angular.mock.module('myApp'));

  var $controller;
  // use the $controller service to get an instance of controller
  beforeEach(angular.mock.inject(function(_$controller_){
    $controller = _$controller_;
  }));
  describe('instance', function () {
    it('should have instance page defined', function () {
      var instance = {};
      var controller = $controller('ContactController');

      expect(controller.page).toEqual("contact");
      expect(controller.title).toEqual("Contact Us");
      expect(instance.message).not.toBe(null);
    });


  });

});

describe('MenuController', function () {

  beforeEach(angular.mock.module('myApp'));

  var $controller;
  var $location;

  beforeEach(angular.mock.inject(function(_$controller_){
    $controller = _$controller_;
  }));

  beforeEach(inject(function ( _$location_) {
      $location = _$location_;
  }));

  describe('active', function () {
    it('should be active', function () {
      var controller = $controller('MenuController', { $location: $location });
      var instance = controller;
      instance.path = '/home';
      var path = instance.menuClass('');
      //console.log(path);
      expect(path).toBe('active');
    });

    it('should be empty', function () {
      var controller = $controller('MenuController', { $location: $location });
      var instance = controller;
      instance.path = '/eee'; // not valid path
      var path = instance.menuClass('home');
      expect(path).toBe('');
    });
  });

});
