angular.module('app').service('questionsSrvc', function($http) {
    this.getQuestions = function(page) {
        return $http({
            method: 'GET',
            url: `https://practiceapi.devmountain.com/api/trivia/questions?page=${page}`
        })
        .then(response => {
            let res = response.data;

            res.map(x => {
                switch(x.difficulty) {
                    case 1:
                        x.difficulty = 'Easy';
                        break;

                    case 2:
                        x.difficulty = 'Medium';
                        break;

                    case 3:
                        x.difficulty = 'Hard';
                        break;

                    default:
                        break;
                }
            })

            return res;
        });
    }

    this.getByDifficulty = function(dif) {
        return $http({
            method: 'GET',
            url: `https://practiceapi.devmountain.com/api/trivia/questions/difficulty/${dif}`
        })
        .then(response => {
            let res = response.data;

            res.map(x => {
                switch(x.difficulty) {
                    case 1:
                        x.difficulty = 'Easy';
                        break;

                    case 2:
                        x.difficulty = 'Medium';
                        break;

                    case 3:
                        x.difficulty = 'Hard';
                        break;

                    default:
                        break;
                }
            })

            return res;
        });
    }

    this.postQuestion = function(question) {
        return $http({
            method: 'POST',
            url: 'https://practiceapi.devmountain.com/api/trivia/questions',
            data: question
        });
    }

    this.putQuestion = function(id, question) {
        return $http({
            method: 'PUT',
            url: `https://practiceapi.devmountain.com/api/trivia/questions/${id}`,
            data: question
        });
    }

    this.deleteQuestion = function(id) {
        return $http({
            method: 'DELETE',
            url: `https://practiceapi.devmountain.com/api/trivia/questions/${id}`
        });
    }
});