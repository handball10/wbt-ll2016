App.ModuleManager.extend("Result",
    {
        wrapperClass: "result",

        wrapperFunction: function (section) {
            // check if there are modules of this module type in the current given section
            // stop this function if not
            var moduleObject = section.find("." + this.wrapperClass);
            if (moduleObject.length < 1) return;

            // generate a copy of this.wrapperClass because jQuery uses the this-context in its way so we cannot acces this.wrapperClass inside a jQuery each function
            var wrapperClassCopy = this.wrapperClass;

            var objectID,
                thisHelper = this;

            // prepare every module in the current article
            moduleObject.each(function (index) {

                var $container = $('<div class="mdl-grid"></div>'),
                    $spacer = $('<div class="mdl-cell mdl-cell--2-col"></div>'),
                    $contentContainer = $('<div class="mdl-cell mdl-cell--8-col"></div>'),
                    $circleContainer = $('<div class="result circle"></div>'),
                    $t = $(this)
                ;

                $contentContainer.append(
                    $circleContainer
                );

                var id = App.Helper.generateUniqueID();

                $circleContainer.attr('id', id);

                $container
                    .append($spacer)
                    .append($contentContainer)
                    .append($spacer.clone())
                ;

                $t.replaceWith($container);

                var parentArticle = $t.parent().parent().parent();

                var bar = new ProgressBar.Circle(
                    document.getElementById(id),
                    {
                        strokeWidth: 15,
                        color: '#FFEA82',
                        trailColor: '#eee',
                        trailWidth: 1,
                        easing: 'easeInOut',
                        duration: 1400,
                        svgStyle: null,
                        text: {
                            value: '',
                            alignToBottom: false
                        },
                        to: {color: '#4CAF50'},
                        from: {color: '#ED6A5A'},
                        // Set default step function for all animate calls
                        step: function (state, bar) {
                            bar.path.setAttribute('stroke', state.color);
                            var value = Math.round(bar.value() * 100);
                            if (value === 0) {
                                bar.setText('0%');
                            } else {
                                bar.setText(value + '%');
                            }

                            bar.text.style.color = state.color;
                        }
                    }
                );
                bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
                bar.text.style.fontSize = '4rem';

                var updateEvent = (function(bar, sectionId){
                    return function(){

                        var sectionResult = Main.controller.question.getSectionResult(sectionId);


                        bar.animate(sectionResult.right / sectionResult.count);
                    }
                })(bar, section.attr('id'));

                $circleContainer.on('article::load', updateEvent)



            });
        }
    }
);