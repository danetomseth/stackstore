app.directive('hfRecEngine', function(MovieFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/recommendation/rec-template.html',
        link: function(scope, elem, attr) {
            
        }
    }
});

app.controller('RecCtrl', function($scope, allUsers, allMovies, populatedUser, allCategories, MovieFactory) {
    $scope.populatedUser = populatedUser;
    $scope.allCategories = allCategories;
    $scope.userCategories = [];
    var userMovies = $scope.populatedUser.movieQueue.queue.map(function(elem) {
        return elem.movie.category
    })
    userMovies.forEach(elem => {
        $scope.userCategories = $scope.userCategories.concat(elem)
    })
    var categoryObj = {};
    $scope.allCategories.forEach(cat => {
        categoryObj[cat._id] = 0;
    });
    $scope.userCategories.forEach(elem => {
        categoryObj[elem]++;
    })
    var favorite = {
        categoryId: '',
        count: 0
    }
    for (var key in categoryObj) {
        if (categoryObj[key] > favorite.count) {
            favorite.categoryId = key;
            favorite.count = categoryObj[key];
        }
    }
    $scope.allCategories.forEach(function(elem) {
        if(elem._id === favorite.categoryId) {
            console.log("favorite found", elem.name);
            $scope.favoriteCategory = elem.name;
        }
    })
    var limit = 5;
    if (favorite.categoryId) {
        MovieFactory.findSimilar(favorite.categoryId, limit).then(bestMatch => {
            $scope.recMovies = bestMatch;
        })
    }
})