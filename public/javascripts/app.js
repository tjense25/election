angular.module('election',[])
        .controller('MainCtrl', ['$scope', '$http', MainCtrl]);

function MainCtrl($scope, $http) {
        $scope.candidates = [];
        $scope.create = function(candidate) {
                return $http.post('/candidate', candidate).success(function(data) {
                        $scope.candidates.push(data);
                });
        };
        $scope.addCandidate = function() {
              if($scope.formContent === '')  return;
              console.log("In addCandidate with "+$scope.formContent);
              $scope.create({
                title: $scope.formContent,
                upvotes: 0,
              });
              $scope.formContent = '';
        };
        $scope.upvote = function(candidate) {
              return $http.put('/candidate/' + candidate._id + '/upvote')
                .success(function(data){
                  console.log("upvote worked");
                  candidate.upvotes += 1;
                });
        };
        $scope.incrementUpvotes = function(candidate) {
                $scope.upvote(comment);
        }
        $scope.delete = function(candidate) {
              $http.delete('/candidate/' + candidate._id )
                .success(function(data){
                  console.log("delete worked");
              });
              $scope.getAll();
        };
        $scope.getAll = function() {
                return $http.get('/candidate').success(function(data) {
                        angular.copy(data, $scope.candidates);
                });
        };
        $scope.getAll();
}

