angular.module('demoApp').controller('MyCtrl', function ($scope) {
    //var vm = this;
	$scope.init = function() {
		$scope.placeholderDiv = document.getElementById("tableauViz");
		$scope.url = "http://public.tableau.com/views/WorldIndicators/GDPpercapita";
		$scope.options = {
			width: $scope.placeholderDiv.offsetWidth,
			height: $scope.placeholderDiv.offsetHeight,
			hideTabs: true,
			hideToolbar: true,
			onFirstInteractive: function () {
				workbook = viz.getWorkbook();
				activeSheet = workbook.getActiveSheet();
			}
		};
			viz = new tableau.Viz($scope.placeholderDiv, $scope.url, $scope.options);
			console.log("viz:",viz);
		};

		$scope.init();
  
});