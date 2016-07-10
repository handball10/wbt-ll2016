/**
 * Created by flori on 10.07.2016.
 */

App.ModuleManager.extend("FourAnswers",
    {
        wrapperClass : "fourAnswers",

        wrapperFunction : function(section){
            // check if there are modules of this module type in the current given section
            // stop this function if not
            var moduleObject = section.find("."+this.wrapperClass);
            if(moduleObject.length < 1) return;

            // generate a copy of this.wrapperClass because jQuery uses the this-context in its way so we cannot acces this.wrapperClass inside a jQuery each function
            var wrapperClassCopy = this.wrapperClass;

            var objectID,
                thisHelper = this;

            // prepare every module in the current article
            moduleObject.each(function(index){
                console.log("Getting Build:: FourAnswers :: ");


                var $module    = $('<div class="module fourAnswers"></div>'),
                    $container = $('<div class="mdl-grid"></div>'),
                    $spacer    = $('<div class="mdl-cell mdl-cell--1-col"></div>'),
                    $spacer2   = $('<div class="mdl-cell mdl-cell--2-col"></div>'),
                    $headerText    = $('<div class="mdl-cell--10-col"></div>'),
                    $buttonContainer = $('<div class="mdl-cell mdl-cell--4-col"></div>'),
                    $resultObject,
                    $t = $(this)
                ;

                var $header = $container.clone();

                $headerText.text(
                    $t.data('question')
                );

                $header
                    .append($spacer.clone())
                    .append($headerText)
                    .append($spacer.clone())
                ;

                $module.append($header);

                var questions = [];
                // get the questions
                $t.find('p').each(function(){
                    var $t_ = $(this);

                    questions.push({
                        text : $t_.text(),
                        answer : typeof $t_.data('correct') !== 'undefined'
                    });
                });

                questions = App.Helper.shuffleElements(questions);

                for(var i = 0, $currentAnswer, $currentRow, $buttonWrapper; i < questions.length; i++){

                    $currentAnswer = $('<div class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button-green mdl-button-wide evaluation-item answer-button"></div>');

                    $currentAnswer.data('correct', !!questions[i].answer);
                    $currentAnswer.text(questions[i].text);

                    $buttonWrapper = $buttonContainer.clone();

                    $buttonWrapper.append($currentAnswer);

                    if(i % 2 === 0){
                        $currentRow = $('<div class="mdl-grid"></div>');

                        $currentRow
                            .append($spacer.clone())
                            .append($buttonWrapper)
                            .append($spacer2.clone())
                        ;

                    } else {

                        $currentRow
                            .append($buttonWrapper)
                            .append($spacer.clone())
                        ;

                        $module.append($currentRow);
                    }

                }

                var parentArticle = $t.parent().parent().parent().parent();

                console.log(parentArticle);

                $module
                    .find('.answer-button')
                    .on('click', function(){

                        var $this = $(this);
                        $module
                            .find('.answer-button')
                            .removeClass('active')
                            .off('click')
                        ;
                        $this.addClass('active');

                        thisHelper.validator($this.data('correct'), parentArticle, id);
                    });

                Main.controller.question.addQuestion(section.attr('id'), id);

                $t.replaceWith($module);
            });
        },

        validator : function(answer, article, questionId){

            if(answer == 1){
                Main.controller.question.addAnswer(questionId, article, true);
            } else {
                Main.controller.question.addAnswer(questionId, article, false);
            }

            return true;
        }
    }
);