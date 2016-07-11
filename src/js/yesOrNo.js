App.ModuleManager.extend("YesOrNo",
    {
        wrapperClass : "yesOrNo",

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

                var $container = $('<div class="mdl-grid"></div>'),
                    $spacer    = $('<div class="mdl-cell mdl-cell--2-col"></div>'),
                    $contentContainer = $('<div class="mdl-cell mdl-cell--8-col"></div>'),
                    $contentGrid = $('<div class="mdl-grid height-150"></div>'),
                    $contentAnswerBoxLeft  = $('<div class="mdl-cell mdl-cell--3-col"></div>'),
                    $contentAnswerBoxRight = $('<div class="mdl-cell mdl-cell--3-col"></div>'),
                    $contentCell = $('<div class="mdl-cell mdl-cell--6-col"></div>'),

                    $resultObject,
                    $t = $(this)
                ;



                // get the question and labels
                var question = $t.data('question'),
                    wrongLabel = $t.data('label-wrong'),
                    rightLabel = $t.data('label-right'),
                    answer     = $t.data('answer')
                ;

                $contentCell.append($('<div class="quest-quest"></div>').text(question));
                // build left and right boxes
                $contentAnswerBoxLeft.append(
                    $('<div class="quest-cross quest-answer"></div>')
                );
                $contentAnswerBoxLeft.append(
                    $('<div class="quest-label"></div>').text(wrongLabel)
                );

                $contentAnswerBoxRight.append(
                    $('<div class="quest-check quest-answer" ></div>')
                );
                $contentAnswerBoxRight.append(
                    $('<div class="quest-label"></div>').text(rightLabel)
                );

                $contentGrid
                    .append($contentAnswerBoxLeft)
                    .append($contentCell)
                    .append($contentAnswerBoxRight)
                ;

                $contentGrid.attr('data-answer', answer);

                var parentArticle = $t.parent().parent().parent();

                // generate ID
                var id = App.Helper.generateUniqueID();
                $contentContainer.attr('id', id);

                // bind answer event
                $contentGrid
                    .find('div.quest-answer')
                    .on('click', function(){
                        var $this = $(this);
                        $contentGrid
                            .find('div.quest-answer')
                            .removeClass('active')
                            .off('click')
                        ;
                        $this.addClass('active');
                        $contentGrid.attr('data-selected', $this.hasClass('quest-cross') ? 0 : 1);

                        thisHelper.validator($this.hasClass('quest-cross') ? 0 : 1, parseInt($contentGrid.data('answer'), 10), parentArticle, id);
                    });

                $contentContainer.append($contentGrid);



                $container
                    .append($spacer)
                    .append($contentContainer)
                    .append($spacer.clone())
                ;

                Main.controller.question.addQuestion(section.data('id'), parentArticle.attr('id'), id);

                $t.replaceWith($container);

            });
        },

        validator : function(answer, correct, article, questionId){

            if(answer == correct){
                Main.controller.question.addAnswer(questionId, article, true);
            } else {
                Main.controller.question.addAnswer(questionId, article, false);
            }

            return true;
        }
    }
);