/**
 * Created by flori on 14.06.2016.
 */


var Main = Main || {};

Main.controller.sidebarController = (function(){
    $.extend(this, new abstractViewController('#sidebar'));

    return this;

})();