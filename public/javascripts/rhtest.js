/**
 * Created by bjornberthelot on 29/05/15.
 */
var app = angular.module("rhtest", []);

app.controller("rhCtrl", ['$scope', 'ImageService', '$http', function ($scope, ImageService, $http) {
	$scope.campaign = {
		dateLimit: true
	};
	$scope.currentImage = "image1.jpg";

	var imageArray = [{
		"name": "image1.jpg",
		"width": 500,
		"height": 375
	}, {
		"name": "image2.jpg",
		"width": 2048,
		"height": 1280
	}, {
		"name": "image3.jpeg",
		"width": 275,
		"height": 183
	}, {
		"name": "image4.jpeg",
		"width": 275,
		"height": 183
	}, {
		"name": "image5.jpeg",
		"width": 344,
		"height": 147
	}, {
		"name": "image6.jpeg",
		"width": 260,
		"height": 194
	}, {
		"name": "images.jpeg",
		"width": 194,
		"height": 259
	}, {
		"name": "ole.jpg",
		"width": 677,
		"height": 788
	}, {
		"name": "telechargement.jpeg",
		"width": 259,
		"height": 194
	}];
	$scope.images = imageArray;
	$scope.imageSelection = [];
	
	$http.get("/imagesapi").
	success(function (data, status) {
		$scope.imageSelection = data;
	}).
	error(function (data, status) {
		document.getElementById("erreur").innerHTML = "Erreur lors de l'appel du json"
	});

	ImageService.load().then(function (data) {
		$scope.images = data;
	});

	$scope.previewImage = function (image) {
		$scope.currentImage = image.name;
	}

	$scope.addItem = function (image) {
		$scope.imageSelection.push(image);
	};
}]);


app.factory('ImageService', ['$http', function ($http) {
	var imageService = {
		load: function () {
			var promise = $http({
				method: 'GET',
				url: '/imagesapi',
				responseType: 'json',
				'headers': {
					'Content-Type': 'application/json'
				}
			}).then(function (response) {
				return response.data;
			});
			return promise;
		}
	};
	return imageService;
}]);