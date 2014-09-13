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
	 * $scope.tasks = [ {	title: 'Buy teapot', description: 'The blue one please', done: false },	{	title: 'Learn angular', description: 'There is some interesting stuff',	done: true }, {	title: 'Go to the cinema', description: 'The guardians of the galaxy', done: false } ];
	 */

	if ( ! angular.isUndefined( window.localStorage['tasks'] ) ) {
		$scope.tasks = JSON.parse( window.localStorage['tasks'] );
	} else {
		$scope.tasks = [ { title: 'Купить чайник', description: 'Нужно обязательно купить синий', done: false }, { title: 'Выучить ангулар',	description: 'Есть еще парочка книг, которые стоит прочесть',	done: true }, {	title: 'Сходить в кино', description: 'Говорят последний фильм про нрчных снайперов очень хорошо', done: false }, {	title: 'Слетать в Амстердам', description: 'В это время года Амстердам особенно хорош', done: false } ];	
	}

	$scope.currentTaskId = -1;

	$scope.activeTask = {
					title: '',
					description: '',
					done: false
				};

	// Create and load the Modal
	$ionicModal.fromTemplateUrl('views/task.html', function(modal) {
			$scope.taskModal = modal;
		},
		{
			scope: $scope,
			animation: 'slide-in-right'
		});

	$scope.deleteItem = function( id ) {
		$scope.tasks.splice( id, 1 );
		saveItems();
	}

	$scope.openTask = function ( id ) {
		var task = $scope.tasks[id]
		$scope.activeTask = {
					title: task.title,
					description: task.description,
					done: $scope.tasks[id].done
				};
		$scope.currentTaskId = id;
		$scope.taskModal.show();
	}

	$scope.addNewTask = function() {
		$scope.activeTask = {
					title: '',
					description: '',
					done: false
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
				done: false
			});
		} else {
			var id = $scope.currentTaskId;
			$scope.tasks[id].title = task.title;
			$scope.tasks[id].description = task.description;
			$scope.tasks[id].done = task.done;
		}

		saveItems();

		$scope.taskModal.hide();
		task.title = "";
		task.description = "";
	}

	function saveItems() {
		window.localStorage['tasks'] = angular.toJson( $scope.tasks );
	}
})
