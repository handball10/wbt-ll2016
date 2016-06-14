/**
 * Created by flori on 14.06.2016.
 */

var Main = Main || {};

Main.controller.headerController = (function(){

    function HeaderController(){
        $.extend(this, new abstractViewController('#header'));

        var controller = this;
    }




    return new HeaderController();

})();
