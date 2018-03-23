angular.module('app').controller('questionsCtrl', function($scope, questionsSrvc) {
    $scope.searchActive   = false;
    $scope.searchBar      = '';
    $scope.modalShow      = false;
    $scope._id            = '';
    $scope.question       = '';
    $scope.animal         = '';
    $scope.difficulty     = 2;
    $scope.correct_answer = 0;
    $scope.option1        = '';
    $scope.option2        = '';
    $scope.option3        = '';
    $scope.option4        = '';
    $scope.editing        = false;
    $scope.showNext       = false;
    $scope.showPrev       = false;
    $scope.questions      = [];
    $scope.page           = 0;
    $scope.getQuestions   = questionsSrvc.getQuestions;

    $scope.toggleSearch = () => {
        $scope.searchActive = !$scope.searchActive;
        $scope.searchBar = '';
    };

    $scope.toggleShow = ques => {
        $scope.modalShow = !$scope.modalShow;
        if ( $scope.modalShow === true ) {
            if ( ques ) {
                $scope._id            = ques._id;
                $scope.editing        = true;
                $scope.question       = ques.question;
                $scope.animal         = ques.animal;
                if ( ques.difficulty === 'Easy' ) {
                    $scope.difficulty = 1;
                } else if ( ques.difficulty === 'Medium' ) {
                    $scope.difficulty = 2;
                } else if ( ques.difficulty === 'Hard' ) {
                    $scope.difficulty = 3;
                }
                $scope.correct_answer = ques.correct_answer;
                $scope.option1        = ques.options[1];
                $scope.option2        = ques.options[2];
                $scope.option3        = ques.options[3];
                $scope.option4        = ques.options[4];
            }
        } else {
            $scope._id            = '';
            $scope.editing        = false;
            $scope.question       = '';
            $scope.animal         = '';
            $scope.difficulty     = 2;
            $scope.correct_answer = 0;
            $scope.option1        = '';
            $scope.option2        = '';
            $scope.option3        = '';
            $scope.option4        = '';
        }
        console.log($scope._id)
    }

    $scope.changePage = dir => {
        dir === 'add' ? $scope.page++ : $scope.page--;
        questionsSrvc.getQuestions($scope.page).then(response => {
            response.length === 10 ? $scope.showNext = true : $scope.showNext = false;
            $scope.page > 0 ? $scope.showPrev = true : $scope.showPrev = false;
            $scope.questions = response;
        });
    }

    $scope.changeFilter = fil => {
        switch(fil) {
            case 0:
                questionsSrvc.getQuestions($scope.page).then(response => $scope.questions = response);
                break;

            case 1:
                questionsSrvc.getByDifficulty(1).then(response => $scope.questions = response);
                break;

            case 2:
                questionsSrvc.getByDifficulty(2).then(response => $scope.questions = response);
                break;

            case 3:
                questionsSrvc.getByDifficulty(3).then(response => $scope.questions = response);
                break;

            default:
                break;
        }
    };

    $scope.checkAnswer = (q, o) => {
        Object.values(q.options).indexOf(o) + 1 === q.correct_answer ? (
            document.getElementById(q._id).style.background = 'rgb(89, 189, 117)'
        ) : (
            document.getElementById(q._id).style.background = 'rgb(218, 45, 123)'
        );
    };

    $scope.getQuestions($scope.page).then(response => {
        response.length === 10 ? $scope.showNext = true : $scope.showNext = false;
        $scope.questions = response;
    });

    $scope.postQuestion = question => questionsSrvc.postQuestion(question).then(response => {
        $scope.getQuestions($scope.page).then(response => {
            response.length === 10 ? $scope.showNext = true : $scope.showNext = false;
            $scope.questions = response;
        });
        $scope.toggleShow();
    });

    $scope.putQuestion = (id, question) => questionsSrvc.putQuestion(id, question).then(response => {
        $scope.getQuestions($scope.page).then(response => {
            response.length === 10 ? $scope.showNext = true : $scope.showNext = false;
            $scope.questions = response;
        });
        $scope.toggleShow();
    });

    $scope.deleteQuestion = id => questionsSrvc.deleteQuestion(id).then(response => {
        $scope.getQuestions($scope.page).then(response => {
            response.length === 10 ? $scope.showNext = true : $scope.showNext = false;
            $scope.questions = response;
        });
        $scope.toggleShow();
    });
})
.directive('questionContainer', function() {
    return {
        templateUrl: './question.html',
    }
})