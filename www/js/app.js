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
	/*
	 * in English:
	 * $scope.tasks = [ {	title: 'Buy teapot', description: 'The blue one please', status: 'new' },	{	title: 'Learn angular', description: 'There is some interesting stuff',	status: 'done' }, {	title: 'Go to the cinema', description: 'The guardians of the galaxy', status: 'new' } ];
	 */

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

	$scope.currentTaskId = -1;

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

	$scope.openTask = function ( id ) {
		var task = $scope.tasks[id]
		$scope.activeTask = {
					title: task.title,
					description: task.description,
					status: 'new'
				};
		$scope.currentTaskId = id;
		$scope.taskModal.show();
	}

	$scope.addNewTask = function() {
		$scope.activeTask = {
					title: '',
					description: '',
					status: 'new'
				};
		$scope.currentTaskId = -1;
		$scope.taskModal.show();
	}

	$scope.closeTask = function() {
		$scope.taskModal.hide();
	}

	$scope.submitTask = function(task) {
		if ( $scope.currentTaskId == -1 ){
			$scope.tasks.push({
				title: task.title,
				description: task.description,
				status: 'new'
			});
		} else {
			var id = $scope.currentTaskId;
			$scope.tasks[id].title = task.title;
			$scope.tasks[id].description = task.description;
		}
		

		$scope.taskModal.hide();
		task.title = "";
		task.description = "";
	}
})
