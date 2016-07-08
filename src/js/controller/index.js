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

            setTimeout(startWBT, 100);

            $('#index-start-wbt').on('click', startWBT);

        };

        this.init = function(){
            bindEvents();
        };
    }

    return new IndexView();

})();

$('.mdl-layout-title').on('click',function(){
    console.log("title");
});

function showLighboxCenter(temp){
    $('#lightbox__center').css('display','block');
    var div = document.createElement("div");
    div.style.backgroundImage = "url('"+temp.src+"')";
    div.style.backgroundPosition = "center";
    div.style.backgroundRepeat = "no-repeat";
    div.style.backgroundSize = "contain";
    div.style.width = "100%";
    div.style.height = "100%";
    $('#lightbox__center--content').append(div);
    showLightboxBackground();
}

function showLightboxBackground(){
    $('#lightbox__background').css('display', 'block');
}

function hideLightboxBackground(){
    $('#lightbox__center--content').empty();
    $('#lightbox__center').css('display','none');
    $('#lightbox__background').css('display','none');

}