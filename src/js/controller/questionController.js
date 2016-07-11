/**
 * Created by flori on 05.07.2016.
 */
var Main = Main || {};

Main.controller.question = (function(){

    var sections = {},
        questions = {},
        articles = {}
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

    var addQuestion = function(sectionID, articleId, id){

        //console.log('adding question to:: ' + sectionID);



        if(!sections[sectionID]){
            addSection(sectionID);
        }

        //articleId = articleId.replace('_','');

        if(!articles[articleId]){
            articles[articleId] = [];
        }

        if(articles[articleId].indexOf(id) === -1){
            articles[articleId].push(id);
        }

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

        for(var i = 0; i < questions.length; i++){

            currentAnswer = getAnswer(questions[i]);

            if(currentAnswer.answered){

                if(currentAnswer.correct){
                    right++;
                } else {
                    wrong++;
                }

            }
        }

        currentSection.rightCount = right;
        currentSection.wrongCount = wrong;

        return {
            right : currentSection.rightCount,
            wrong : currentSection.wrongCount,
            count : currentSection.questions.length / 2
        };

    };

    var canProceed = function(currentArticleId){

        if(typeof articles[currentArticleId] === 'undefined'){
            return true;
        } else {
            var ret = false;

            for(var i = 0; i < articles[currentArticleId].length; i++){
                ret = questions[articles[currentArticleId][i]].answered;

                if(!ret) break;
            }

            return ret;
        }
    };

    return {
        init : init,
        addSection : addSection,
        addAnswer : addAnswer,
        addQuestion : addQuestion,
        getSectionResult : getSectionResult,
        canProceed : canProceed
    }

})();