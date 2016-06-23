/**
 * Created by flori on 19.06.2016.
 */

Main.controller.mascot = (function(){

    function Mascot(element){
        $.extend(this, new abstractViewController(element));

        var controller = this;

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

        var settings = {
            size : 'default',
            selector : element,
            $mascotSelector : null,
            $blockSelector : null
        };

        var dialogs = {
            wrong : [],
            right : [],
            say : [],
            tip : []
        };

        this.init = function(){
            $('body').append()
        };

        this.say = function(say){

        };

        this.tip = function(){

            if(dialogs.tip.length === 0) return;

            var tipToDisplay = dialogs.tip[(Math.floor(Math.random() * dialogs.tip.length))];

            settings.$blockSelector.text(
                tipToDisplay.text
            );

            settings.$blockSelector.addClass('oval-thought');

            controller.animateBubble('in', tipToDisplay.delay);
        };

        this.animateBubble = function(mode, delay){
            switch(mode){
                case 'in':
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

        this.toSize = function(size){

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

        var $grid = $('<div class="mdl-grid"></div>'),
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

        if(settings.selector.hasClass('mascot--left')){

            $block.addClass('left');

            $grid.append(
                    $('<div class="mdl-cell mdl-cell--2-col"></div>')
                        .append($mascot)
                ).append(
                    $('<div class="mdl-cell mdl-cell--4-col"></div>')
                        .append($block)
                );
        } else if(settings.selector.hasClass('mascot--right')){

            $block.addClass('right');

            $grid
                .append(
                    $('<div class="mdl-cell mdl-cell--2-col"></div>')
                )
                .append(
                    $('<div class="mdl-cell mdl-cell--4-col"></div>')
                )
                .append(
                    $('<div class="mdl-cell mdl-cell--4-col"></div>')
                        .append($block)
                ).append(
                    $('<div class="mdl-cell mdl-cell--2-col"></div>')
                        .append($mascot)
                );
        }

        settings.selector.append($grid);

        $mascot.on('click', controller.tip);



        return this;

    }

    var mascots = [];
    // get all mascots
    var $mascotItems = $('.mascot');

    $mascotItems.each(function(){
        mascots.push(new Mascot($(this)));
    });

    return mascots;

})();