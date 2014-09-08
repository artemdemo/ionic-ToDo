angular.module('ToDo', ['ionic', 'ngAnimate'])

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

.controller('ToDoCtrl', function( $scope, $ionicModal, $timeout ){
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

	$scope.activeTask = {
					title: '',
					description: '',
					status: 'new'
				};

	// Create and load the Modal
	$ionicModal.fromTemplateUrl('views/task.html', function(modal) {
			$scope.taskModal = modal;
		},
		{
			scope: $scope,
			animation: 'slide-in-right'
		});

	$scope.isChecked = function ( item ) {
		return item.status == 'done';
	}

	$scope.toggleChecked = function ( item ) {
		item.status = item.status == 'new' ? 'done' : 'new';
	}

	$scope.deleteItem = function( id ) {
		$scope.tasks.splice( id, 1 );
	}

	$scope.openTask = function ( task ) {
		console.log( task );
		$scope.activeTask = {
					title: task.title,
					description: task.description,
					status: 'new'
				};
		$scope.newTask = false;
		$scope.taskModal.show();
	}

	$scope.addNewTask = function() {
		$scope.activeTask = {
					title: '',
					description: '',
					status: 'new'
				};
		$scope.newTask = true;
		$scope.taskModal.show();
	}

	$scope.closeTask = function() {
		$scope.taskModal.hide();
	}

	$scope.submitTask = function(task) {
		$scope.tasks.push({
			title: task.title,
			description: task.description,
			status: 'new'
		});

		$scope.taskModal.hide();
		task.title = "";
		task.description = "";
	}
})
