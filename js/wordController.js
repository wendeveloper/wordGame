//create the module called myApp
angular.module('myApp', [])
//create controller called cartController
    .controller('WordController', function ($scope) {


            //WORD PROPERTIES ARRAY of default words
            var defaultWords = [
                {
                    noun: '',
                    adjective: '',
                    verb: '',
                    pluralNoun: '',
                    myColor: '',
                    fName: '',
                    lName: ''
                }

            ];

            //STORED DATA to check for words.  If there are words,
            // parse through and overwrite the default list
            var storedData = window.localStorage.getItem("word_cart");
            if (storedData != null) {
                defaultWords = JSON.parse(storedData);
            }

           $scope.words = defaultWords;

            //SAVE WORDS TO LOCAL STORAGE
            $scope.saveWords = function() {
                //save JSON to LOCAL STORAGE
                //stringify converts it to a string
                window.localStorage.setItem("word_cart", JSON.stringify($scope.words));

            }


        }
    );

