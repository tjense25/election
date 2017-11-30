angular.module('election',[])
        .controller('MainCtrl', ['$scope', '$http', MainCtrl]);

function MainCtrl($scope, $http) {
        $scope.candidates = [];
	$scope.selectedCandidates = [];
	$scope.voted = false;
        $scope.create = function(candidate) {
                return $http.post('/candidate', candidate).success(function(data) {
                        $scope.candidates.push(data);
                });
        };
	$scope.vote = function() {
		$scope.voted = true;
		$scope.selectedCandidates = [];
		angular.forEach($scope.candidates, function(cand, i) {
			if(cand.selected) {
				$scope.selectedCandidates.push(cand);
				$scope.incrementUpvotes(cand);	
				cand.selected = false;
			}
		});
	}
        $scope.addCandidate = function() {
              if($scope.formContent === '')  return;
              console.log("In addCandidate with "+$scope.formContent);
              $scope.create({
                title: $scope.formContent,
                votes: 0,
              });
              $scope.formContent = '';
        };
        $scope.upvote = function(candidate) {
              return $http.put('/candidate/' + candidate._id + '/upvote')
                .success(function(data){
                  console.log("upvote worked");
                  candidate.votes += 1;
                });
        };
        $scope.incrementUpvotes = function(candidate) {
                $scope.upvote(candidate);
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

