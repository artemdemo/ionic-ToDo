angular.module('ToDo', ['ionic'])

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

.controller('ToDoCtrl', function( $scope ){
	$scope.tasks = [
			{
				title: 'Купить чайник',
				description: 'Нужно обязательно купить синий',
				status: 'new'
			},
			{
				title: 'Выучить ангулар',
				description: 'Есть еще парочка книг, которые стоит прочесть',
				status: 'done'
			},
			{
				title: 'Сходить в кино',
				description: 'Говорят последний фильм про нрчных снайперов очень хорошо',
				status: 'new'
			},
			{
				title: 'Слетать в Амстердам',
				description: 'В это время года Амстердам особенно хорош',
				status: 'new'
			}
		];
	$scope.isChecked = function ( item ) {
		return item.status == 'done';
	}
	$scope.toggleChecked = function ( item ) {
		item.status = item.status == 'new' ? 'done' : 'new';
	}
	$scope.deleteItem = function( item ) {
		console.log('delete');
	}
	$scope.openTask = function ( item ) {
		console.log (item);
	}
	$scope.addNewTask = function() {
		console.log('addNewTask');
	}
})
