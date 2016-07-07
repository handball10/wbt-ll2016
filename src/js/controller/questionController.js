/**
 * Created by flori on 05.07.2016.
 */


Main.controller.question = (function(){

    var sections = {},
        questions = {}
    ;

    var init = function(){





    };

    var addSection = function(sectionID){
        sections[sectionID] = {
            questions : []
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

        console.log(questionId, correct);

        if(!questions[questionId]) return;

        questions[questionId].answered = true;
        questions[questionId].correct  = correct;

        // find mascot
        var mascot = article.find('.mascot');

        console.log(mascot);

        correct ? mascot.trigger('article::right') : mascot.trigger('article::wrong');


    };




    var getSectionResult = function(sectionName){

        if(!sections[sectionName]){
            return;
        }


    };




    return {
        init : init,
        addSection : addSection,
        addAnswer : addAnswer,
        addQuestion : addQuestion
    }

})();