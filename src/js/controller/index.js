/**
 * Created by flori on 13.06.2016.
 */

var Main = Main || {};

Main.controller.indexView = (function(){

    $.extend(this, new abstractViewController('#view-index'));

    /**
     * starts the wbt after clicking the start button
     */
    var startWBT = function(){

    };

    var bindEvents = function(){

        $('#index-start-wbt').on('click', startWBT);

    };

    this.init = function(){
        bindEvents();
    };

    return this;

})();