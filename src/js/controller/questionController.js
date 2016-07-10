/**
 * Created by flori on 05.07.2016.
 */
var Main = Main || {};

Main.controller.question = (function(){

    var sections = {},
        questions = {}
    ;

    var init = function(){};

    var addSection = function(sectionID){

        console.log('adding section:: '+sectionID);

        sections[sectionID] = {
            questions : [],
            rightCount : 0,
            wrongCount : 0
        };
    };

    var addQuestion = function(sectionID, id){

        //console.log('adding question to:: ' + sectionID);


        if(!sections[sectionID]){
            addSection(sectionID);
        }

        console.log(sections);

        if(sections[sectionID].questions.indexOf(id) > -1){
            //console.log('adding:: already in use:: '+id);
            return;
        }

        sections[sectionID].questions.push(id);

        questions[id] = {
            answered : false,
            correct : false
        };

    };

    var addAnswer = function(questionId, article, correct){

        if(!questions[questionId]) {
            return;
        }

        questions[questionId].answered = true;
        questions[questionId].correct  = correct;

        // find mascot
        var mascot = article.find('.mascot');

        correct ? mascot.trigger('article::right') : mascot.trigger('article::wrong');

        mascot
            .off('article::right')
            .off('article::wrong')
        ;

    };

    function getAnswer(questionID){
        return questions[questionID];
    }

    var getSectionResult = function(sectionName){

        console.log(sectionName);

        if(!sections[sectionName]){
            return {
                right : 0,
                wrong : 0,
                count : 1
            };
        }

        var currentSection = sections[sectionName];
        var questions = currentSection.questions,
            right = 0,
            wrong = 0,
            currentAnswer
        ;

        console.log(currentSection.questions);

        for(var i = 0; i < questions.length; i++){

            currentAnswer = getAnswer(questions[i]);

            if(currentAnswer.answered){

                console.log(currentAnswer);

                if(currentAnswer.correct){
                    right++;
                } else {
                    wrong++;
                }

            }
        }

        console.log(right, wrong);

        currentSection.rightCount = right;
        currentSection.wrongCount = wrong;

        var result = {
            right : currentSection.rightCount,
            wrong : currentSection.wrongCount,
            count : currentSection.questions.length / 2
        };

        return result;

    };

    return {
        init : init,
        addSection : addSection,
        addAnswer : addAnswer,
        addQuestion : addQuestion,
        getSectionResult : getSectionResult
    }

})();