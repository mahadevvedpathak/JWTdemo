// Invoke 'strict' JavaScript mode
'use strict';

// Set the main application name
var sampleModule = 'demoApp';


// Create the main application
var sampleModule = angular.module('demoApp', ['ui.router','ngMessages','angular-storage']);

sampleModule
.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', 'storeProvider' , function($urlRouterProvider, $stateProvider, $httpProvider , storeProvider) {
  $urlRouterProvider.otherwise('/signin');
 
    $stateProvider
    .state('signin', {
      url: '/signin',
      templateUrl: 'templates/signin.html',
      controller : 'MainController'
    })

    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html'
    })

    .state('tableau', {
      url: '/tableau',
      templateUrl: 'templates/tableau.html'
    })

    .state('tableau1', {
      url: '/tableau1',
      templateUrl: 'templates/tableau1.html',
      controller : 'MyCtrl'
    })

    .state('controllerAs', {
      url: '/controllerAs',
      templateUrl: 'templates/controllerAs.html',
      controller : 'MainController as main'
    })

    .state('login', {
      url : '/login',
      templateUrl : 'templates/login.html',
      controller : 'MainController' 
    });

}])

  //angular.module("angular-tableau",[])
    .value('tableau',tableau)
    .directive('tableauViz', ['$q','$interval','tableau',function($q,$interval,tableauApi) {
        return {
            restrict: 'E',
            template:'<div></div><div style="position: absolute; top:0; height:100%; width:100%; opacity: 0;"></div>',
            scope: {
                url: '=',
                height: '=',
                width: '=',
                filters: '='
            },
            link: function(scope,element,attrs) {
                // Just some housekeeping since the browser won't know how to style this element
                element.css('display', 'block');
                element.css('position', 'relative');
                // Set target for viz
                var vizTarget = element[0].children[0];
                var viz;
                // Block user input if cover is specified
                if(!('cover' in attrs)) {
                    var cover = angular.element(element[0].children[1]);
                    cover.css('display','none');
                }
                // We need to have a URL to do anything
                if(!scope.url) {
                    console.log("Error: No URL was specified for Tableau Viz");
                    return;
                }
                // Create the dashboard
                function createViz() {
                    viz = new tableauApi.Viz(vizTarget, scope.url, {
                        'height': scope.height ? scope.height : '100%',
                        'width': scope.width ? scope.width : '100%',
                        'hideTabs': 'showTabs' in attrs ? false : true,
                        'hideToolbar': 'showToolbar' in attrs ? false : true,
                        'onFirstInteractive': function() {
                            applyFilters();
                            scope.$watch('filters', function(newValue, oldValue) {
                                applyFilters();
                            }, true);
                        }
                    });
                }
                createViz();
                // We need to rebuild the dashboard periodically to accommodate session timeouts. This is pretty hacky though. :/
                var stop = $interval(function rebuild() {
                    viz.dispose();
                    createViz();
                }, 300000)
                // Destroy the dashboard and interval timers upon destroying directive.
                scope.$on('$destroy', function() {
                    if (viz) viz.dispose();
                    if (angular.isDefined(stop)) {
                        $interval.cancel(stop);
                        stop = undefined;
                    }
                });
                
               

                // Define a function to apply filters to dashboard
                /*function applyFilters() {
                    var dash = viz.getWorkbook().getActiveSheet();
                    var filtersArr = Object.keys(scope.filters);
                    for (var i=0; i<filtersArr.length; i++) {
                        var filterValue = scope.filters[filtersArr[i]];
                        // If it's a dashboard, we need to filter each sheet individually.
                        if(dash.getSheetType() === 'dashboard') {
                            var sheets = dash.getWorksheets();
                            for(var j=0; j<sheets.length; j++) {
                                applyFilterToSheet(sheets[j], filtersArr[i], filterValue)
                            }
                        }
                        if(dash.getSheetType() === 'worksheet') {
                            applyFilterToSheet(dash, filtersArr[i], filterValue)
                        }
                    }
                }*/
               
                // Define a function to apply filters to individual sheet
                /*function applyFilterToSheet(sheet, key, filter) {
                    if(filter.min && filter.max) {
                        // Deal with JavaScript quirk on date objects.
                        var postIncrementDate = angular.copy(filter.max);
                        postIncrementDate.setDate(postIncrementDate.getDate() + 1);
                        sheet.applyRangeFilterAsync(key, {
                            min: filter.min,
                            max: postIncrementDate
                        });
                    }
                    else {
                        sheet.applyFilterAsync(key, filter, tableau.FilterUpdateType.REPLACE)
                    }
                }*/
            }
        };
    }]);


angular.module('demoApp').controller('MainController', [
  '$scope',
  '$http',
  '$stateParams',
  '$location',
  '$rootScope',
  '$state',
  'store',
  '$timeout',
  function($scope, $http, $stateParams, $location, $rootScope, $state, store, $timeout) {
     this.sameprop = 'this is sample message';

     $scope.user ={};

     $scope.login =function(){
      console.log("Calling login function");
        $http.post(baseURL + 'login' , $scope.user).success(function(res){
          console.log(res);

        }).error(function(error){
          console.log("someything is wrong...");

        });

     }
  	/*$scope.init = function() {
        
  	};

    $scope.docallBack = function() {
        var friends = ["Mike", "Stacy", "Andy", "Rick"];
        letscallBackFunction(friends, function(res){
          console.log("success");
          console.log(res);
        });

        
    };

    function letscallBackFunction(friends , callback){
        var info = angular.forEach(friends,function (eachName, index){
            console.log(index + 1 + ". " + eachName); // 1. Mike, 2. Stacy, 3. Andy, 4. Rick​
        });
      callback(info);  
      
    };

    //simple for loop
    $scope.forloop = function(){
      var i,j,yy;
        for(i=0; i<10; i++){
            for(j=1 ; j<i ; j++){
              yy = yy+("*");   
            }

        }
      console.log("yy:",yy);
       yy ='';
    };

    //print on simple pattern
    $scope.printPattern = function(){
      var i = 1;
      for(;i<11;i++){
        console.log("*");
      }
    }

    //simple for each in javascrpit
    $scope.SimpleForEach =function(){
      var copyname=[];
      var names = ["sam","sam1","sam2"];
      names.forEach(function(name){
        console.log("name:",name);
      },copyname);
      console.log(copyname);
    }*/
    /**
      @function signout
      @returns successful signout successful message and go to signin page
      @author Sameer Vedpathak
      @initialDate 
      @lastDate
    */

    /*$scope.superadminsignout = function() {
      $cookieStore.remove('superadminuser');
      $scope.init();
      AuthService.isAuthenticated = false;
      $location.path('signin');
    };

    $scope.ConcatTwoArray = function(){
      var A = ["a","b","c"];
      var B = ["d","e","f"];
      var C = A.concat(B);
      console.log("C:",C);
    }*/

    /**
      @function superadminforgetpass
      @returns successful message, get Email for verify Code and go to Forgate password Verify
      @author sameer vedpathak
      @initialDate  
      @lastDate  
    */
   /* $scope.superadminforgetpass = function(data, valid) {
      if (valid) {
        $scope.email = data;
        if ($scope.email == undefined || $scope.email == "") {
          console.log("Please Enter Valid EmailId");

        } else {

          $http.post(baseUrl + 'superadminlogin/superadminforgotpass', data).success(function(res, req) {

            if (res.status == true){
                $scope.superadminCheckEmail = "Please Check Register Email...";
                $scope.ShowsuperadminCheckEmail = true;
                $timeout(function() {
                  // Loadind done here - Show message for 3 more seconds.
                  $timeout(function() {
                  $scope.ShowsuperadminCheckEmail = false;
                }, 3000);
                  $state.go("superadmin/forgotpasswordverify");
                }, 2000);

            }else{
                $scope.errormessage = 'Failed';
                $scope.showEMessage = true;
                $timeout(function() {
                   // Loadind done here - Show message for 3 more seconds.
                  $timeout(function() {
                    $scope.showEMessage = false;
                  }, 3000);
                }, 2000);

            }

          }).error(function(err) {
            console.log(err);
          });
        }
      };
    };*/

    /**
    @function superadminforgetpassverify
    @returns successful message,Getting password Changed Mail and goes to superadminsignin
    @author sameer vedpathak
    @initialDate 
    @lastDate 
    */

   /* $scope.superadminforgetpassverify = function(data, valid) {
      if (valid) {
        $scope.credential = data;
        if ($scope.credential.contact_email == undefined || $scope.credential.contact_email == '' || $scope.credential.password == undefined || $scope.credential.password == "" || $scope.credential.verificationcode == undefined || $scope.credential.verificationcode == "") {
          console.log("Please Enter Valid Email Address");
        } else {
          $http.post(baseUrl + 'superadminlogin/superadminforgotpassverify', $scope.credential).success(function(res, req) {
            if (res.status == false) {
              $scope.SuperadminForgotpassError = "Please Enter Valid Email,Password and Verification Code";
              $scope.ShowSuperadminForgotpassError = true;
              $timeout(function() {
                // Loadind done here - Show message for 3 more seconds.
                $timeout(function() {
                  $scope.ShowSuperadminForgotpassError = false;
                }, 3000);
              }, 2000);
            } else {

              $scope.Superadminpasswordchanged = "Password Successfully Changed";
              $scope.SuperadminpasswordchangedMsg = true;
              $timeout(function() {
                // Loadind done here - Show message for 4 more seconds.
                $timeout(function() {
                  $scope.SuperadminpasswordchangedMsg = false;
                }, 4000);
                $location.path('superadminsignin');
              }, 2000);
            }


          }).error(function(err, res) {
            console.log(err);
          });
        }
      }
    };*/

  }
]);
