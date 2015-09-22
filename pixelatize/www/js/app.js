// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.controller('MainCtrl', function($scope, $ionicPlatform) {
  console.log("Loaded");
  $scope.appNotReady = true;
  $scope.pixelSize = 10;

  $ionicPlatform.ready(function() {
    console.log('yes i fucking run');
    $scope.appNotReady = false;
    $scope.$apply();
    var imgDom = document.querySelector("#selectedImage");
    var canvasDom = document.querySelector("#image");

    $scope.selPicture = function() {
      console.log("select picture");

      //pixelatizeModule.pixelatize(imgDom, canvasDom, $scope.pixelSize);
      navigator.camera.getPicture(function(url) {
        console.log('success', url);
        imgDom.onload = function() {
          //pixelatizeModule.pixelatizeImage(imgDom, canvasDom, $scope.pixelSize);
          console.log($scope.pixelSize);
          var mySize = $scope.pixelSize;
          pixelatizeModule.pixelatizeImage(imgDom, canvasDom, mySize);
        }
        imgDom.src = url;
      }, function(err) {
        console.log('err', err);
      }, {
        quality: 50,
        sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType:Camera.DestinationType.FILE_URI,
        targetWidth:300,
        targetHeight:300
      });
    };

  });

})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
