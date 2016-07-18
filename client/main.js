// Register a main module
angular.module('myApp', ['ngRoute','ui.bootstrap','ngConfirmModule']);

// Config
angular.module('myApp')
  .config(config)
  // Run
  .run(run)

config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];

function config($routeProvider, $locationProvider, $httpProvider) {
  // console.log($locationProvider)
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home',
      controller: 'MainController',
      controllerAs: 'vm',
      access: {restricted: false}
    })
    .when('/login', {
      templateUrl: 'auth/login',
      controller: 'loginController',
      controllerAs: 'ctrl',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      controllerAs: 'logoutCtrl',
      access: {restricted: false}
    })
    .when('/register', {
      templateUrl: 'auth/register',
      controller: 'registerController',
      controllerAs: 'ctrl',
      access: {restricted: false}
    })
    .when('/about', {
      templateUrl : 'partials/about',
      controller  : 'AboutController',
      controllerAs  : 'vm',
      access: {restricted: false}
    })
    // route for the contact page
    .when('/contact', {
      templateUrl : 'partials/contact',
      controller  : 'ContactController',
      controllerAs  : 'vm',
      access: {restricted: false}
    })
    .when('/error', {
      templateUrl: 'partials/error',
      controller: 'ErrorController',
      controllerAs: 'vm',
      access: {restricted: false}
    })
    // CMS with restricted access
    .when('/CMS', {
      templateUrl: 'partials/cms',
      controller: 'DashboardController',
      controllerAs: 'cms',
      access: {restricted: true}
    })

    // Contacts
    .when('/CMS/contacts', {
      templateUrl: 'contacts/index',
      controller: 'ContactsController',
      controllerAs: 'cCtrl',
      access: {restricted: true}
    })
    //get a contact by id - list tasks, caseworks, etc
    .when('/CMS/contacts/:id', {
      templateUrl: 'contacts/contact',
      controller: 'ContactsController',
      controllerAs: 'cCtrl',
      access: {restricted: true}
    })
    // Tasks
    .when('/CMS/tasks', {
      templateUrl: 'tasks/index',
      controller: 'TasksController',
      controllerAs: 'tCtrl',
      access: {restricted: true}
    })
    // not in use yet
    .when('/CMS/tasks/:id', {
      templateUrl: 'tasks/templ',
      controller: 'TasksController',
      controllerAs: 'tCtrl',
      access: {restricted: true}
    })

    // If route does not exist - go to error page
    .otherwise({
      redirectTo: '/error',
      access: {restricted: false}
    });
    // Add base tag in head
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  });

  $httpProvider.interceptors.push('httpInterceptor');
}



run.$inject = ['$rootScope', '$location', '$route', 'AuthService'];

function run($rootScope, $location, $route, AuthService) {

  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    $rootScope.loggedIn = false;
    $rootScope.error = false;
    $rootScope.username = null;

    var check = AuthService.isLoggedIn();
    if(check){
      $rootScope.loggedIn = true;
      $rootScope.username = AuthService.currentUser();
    }

    // For restricted access
    if (next.access.restricted && !check){
      $location.path('/login');
      $route.reload();
    }

  });
}

