/**
 * Created by flori on 13.06.2016.
 */

var Main = Main || {};

Main.controller.indexView = (function(){

    function IndexView(){
        $.extend(this, new abstractViewController('#view-index'));

        var controller = this;

        /**
         * starts the wbt after clicking the start button
         */
        var startWBT = function(){
            controller.fadeOut();
            Main.controller.headerController.fadeIn();
            Main.controller.sidebarController.fadeIn();
            App.init();
        };

        var bindEvents = function(){

            $('#index-start-wbt').on('click', startWBT);

        };

        this.init = function(){
            bindEvents();
        };
    }

    return new IndexView();

})();