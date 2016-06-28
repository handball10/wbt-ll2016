/**
 * Created by flori on 19.06.2016.
 */

Main.controller.mascot = (function(){

    function Mascot(element){

        if(element.attr('data-init') === "1"){
            console.log('inited');
            return null;
        }

        element.attr('data-init', 1);


        $.extend(this, new abstractViewController(element));

        var controller = this;

        // mascot options
        var options = {
            size : {
                l   : 1.6,
                great : 1.3,
                default : 1,
                small :.7,
                xxs : .4
            },
            delay : {
                tip : 10000,
                say : 3000
            }
        };

        // mascot settings
        var settings = {
            size : 'default',
            selector : element,
            $mascotSelector : null,
            $blockSelector : null
        };

        /**
         * contains all dialog found in the mascot element
         * @type {{wrong: Array, right: Array, say: Array, tip: Array}}
         */
        var dialogs = {
            wrong : [],
            right : [],
            say : [],
            tip : []
        };

        /**
         * @ignore
         */
        this.init = function(){
            $('body').append()
        };

        this.say = function(sayingIndex){

            settings.$blockSelector
                .removeClass('oval-though')
                .addClass('oval-speech');

            settings.$blockSelector.text(
                dialogs.say[sayingIndex].text
            );


        };

        /**
         * displays a random string from dialog tips array
         */
        this.tip = function(){

            if(dialogs.tip.length === 0) return;

            settings.$blockSelector.removeClass('oval-speech');

            var tipToDisplay = dialogs.tip[(Math.floor(Math.random() * dialogs.tip.length))];

            settings.$blockSelector.text(
                tipToDisplay.text
            );

            settings.$blockSelector.addClass('oval-thought');

            controller.animateBubble('in-out', tipToDisplay.delay);
        };

        this.autoplay = function(index){

            if(dialogs.say.length === 0 || index >= dialogs.say.length){
                controller.animateBubble('out');
                return;
            }

            if(index === 0){
                settings.$blockSelector
                    .removeClass('oval-though')
                    .addClass('oval-speech');
                controller.animateBubble('in');
            }

            var currentSpeech = dialogs.say[index];

            settings.$blockSelector.text(
                currentSpeech.text
            );

            setTimeout(function(){
                controller.autoplay(++index);
            }, currentSpeech.delay)


        };

        /**
         * animates the bubble
         * @param mode {String} in | out
         * @param delay {Number} Time in ms to display the bubble
         */
        this.animateBubble = function(mode, delay){
            switch(mode){
                case 'in' :
                    settings.$blockSelector
                        .fadeIn('fast');
                    break;
                case 'in-out':
                    settings.$blockSelector
                        .fadeIn('fast')
                        .delay(delay)
                        .fadeOut('fast')
                    ;

                    break;
                case 'out':
                    settings.$blockSelector.fadeOut();

                    break;
            }
        };

        this.right = function(){
            if(dialogs.right.length === 0) return;

            var item = dialogs.right[(Math.floor(Math.random() * dialogs.right.length))];

            settings.$blockSelector.text(
                item.text
            );

            controller.animateBubble('in-out', item.delay);

            return item.delay;
        };

        this.wrong = function(){
            if(dialogs.wrong.length === 0) return;

            var item = dialogs.wrong[(Math.floor(Math.random() * dialogs.wrong.length))];

            settings.$blockSelector.text(
                item.text
            );

            controller.animateBubble('in-out', item.delay);

            return item.delay;
        };



        // parse all dialogs
        for(var type in dialogs){
            settings.selector
                .find(type)
                .each(function(){
                    var _t = $(this);
                    dialogs[type].push({
                        text : _t.text(),
                        delay : parseInt(_t.data('delay') || 5000, 10)
                    });
                    _t.remove();
                });
        }

        var $grid = $('<div class="mdl-grid mascot--init"></div>'),
            $block = $('<blockquote></blockquote>'),
            $mascot = $('<div class="mascot-broc"></div>')
        ;

        settings.$mascotSelector = $mascot;
        settings.$blockSelector = $block;

        // add color to bubbles
        if(settings.selector.hasClass('blue')){
            $block.addClass('bubble-blue')
        } else if(settings.selector.hasClass('green')){
            $block.addClass('bubble-green');
        }

        $block.hide();

        $mascot.on('click', controller.tip);

        if(settings.selector.hasClass('mascot--left')){

            $block.addClass('left');

            $grid.append(
                    $('<div class="mdl-cell mdl-cell--2-col"></div>')
                        .append($mascot)
                ).append(
                    $('<div class="mdl-cell mdl-cell--10-col"></div>')
                        .append($block)
                );
        } else if(settings.selector.hasClass('mascot--right')){

            $block.addClass('right');

            $grid

                .append(
                    $('<div class="mdl-cell mdl-cell--10-col"></div>')
                        .append($block)
                ).append(
                    $('<div class="mdl-cell mdl-cell--2-col"></div>')
                        .append($mascot)
                );
        }

        settings.selector.append($grid);

        // bind events

        // click


        var parentArticle = element;
        //var parentArticle = element.closest('article');

        // article::load
        settings.selector.hasClass('autoplay') && parentArticle.on('article::load', function(){controller.autoplay(0);});
        if(dialogs.right.length > 0){
            parentArticle.on('article::right', controller.right);

        }
        dialogs.wrong.length > 0 && parentArticle.on('article::wrong', controller.wrong);

        return this;

    }

    return function(){
        var mascots = [];
        // get all mascots
        var $mascotItems = $('.mascot');


        $mascotItems.each(function(){
            var m = new Mascot($(this));

            mascots.push(m);
        });

        return mascots;
    }


})();

$(window).on('stepper::init', function(){
    Main.controller.mascot();
});