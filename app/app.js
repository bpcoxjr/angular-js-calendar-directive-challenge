//declare angular module 'calendarDemoApp'
var app = angular.module('calendarDemoApp', []);

//this directive controls & loads calendar-partial into html
app.directive('calendarPartial', function(){
	return {
		restrict: 'E',
		templateUrl: 'calendar-partial.html',
		controller: function controller($scope, $element, $attrs){

			//set the values for dropdown menus when app first initializes
			var date = new (Date);
			var currentMonth = date.getMonth();
			var currentYear = date.getFullYear();

			//set the month and year to the current month and year by applying ng-model to the
			//dropdown menu, capturing user choice & storing in currentMonth/currentYear variables
			$scope.selectedMonth = currentMonth;
			$scope.selectedYear = currentYear;

			//when different month/year chosen from drop down menu, show appropriate calendar
			//by applying ng-change to dropdown menu & setting equal to refreshCalendar function
			$scope.refreshCal = function(){
				currentMonth = $scope.selectedMonth;
				$scope.loadCal($scope.selectedYear, $scope.selectedMonth);
			};

			//load the calendar using function found in calendarRange.js
			$scope.loadCal = function(year, month){
				$scope.range = CalendarRange.getMonthlyRange(new Date(year, month));
				//darken out any days that aren't part of the current month
				$scope.range.days.forEach(greyOut);
				$scope.range.days.forEach(highlightCurrentDate);
			};

			//display the calendar when page loads
			$scope.loadCal(currentYear, currentMonth);

			//make the days that are part of last month or next month a different color
			//than the days of the current month
			function greyOut(element, index, array){
				if(element.month < currentMonth || element.month > currentMonth) {
					element.monthClass = 'last-month-or-next';
				}
			}
			//highlight the current date on the calendar yellow
			function highlightCurrentDate(element, index, array){
				//clone element.date & set time to midnight
				var newDate = new Date(element.date);
				newDate.setHours(0, 0, 0, 0);
				//clone date & set time to midnight
				var midnightDate = new Date(date);
				midnightDate.setHours(0, 0, 0, 0);
				//
				if(newDate.getTime() == midnightDate.getTime()){
					element.dateClass = 'highlight-current-date';
				}
			}
		}
	};
});