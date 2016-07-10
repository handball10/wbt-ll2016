/**
 * Created by flori on 05.07.2016.
 */
var Main = Main || {};

Main.controller.question = (function(){

    var sections = {},
        questions = {}
    ;

    var addSection = function(sectionID){
        sections[sectionID] = {
            questions : [],
            rightCount : 0,
            wrongCount : 0
        };
    };

    var addQuestion = function(sectionID, id){
        if(!sections[sectionID]){
            addSection(sectionID);
        }

        sections[sectionID].questions.push(id);

        questions[id] = {
            answered : false,
            correct : false
        };

    };

    var addAnswer = function(questionId, article, correct){

        if(!questions[questionId]) return;

        console.log('question found');

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

        if(!sections[sectionName]){
            return {
                right : 0,
                wrong : 0,
                count : 0
            };
        }

        var currentSection = sections[sectionName];
        var questions = currentSection.questions,
            right = 0,
            wrong = 0,
            currentAnswer
        ;

        for(var i = 0; i < questions.length; i++){

            console.log('walking');

            currentAnswer = getAnswer(questions[i]);

            console.log(currentAnswer);

            if(currentAnswer.answered){
                currentAnswer.correct ? right++ : wrong++;

            }
        }

        currentSection.rightCount = right;
        currentSection.wrongCount = wrong;

        return {
            right : currentSection.rightCount,
            wrong : currentSection.wrongCount,
            count : questions.length / 2
        };

    };

    return {
        init : init,
        addSection : addSection,
        addAnswer : addAnswer,
        addQuestion : addQuestion,
        getSectionResult : getSectionResult
    }

})();