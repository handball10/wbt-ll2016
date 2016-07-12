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

            //setTimeout(startWBT, 100);

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

function showTextbox(temp){
    if($(temp).next().hasClass('text-invisible')){
        $('.textbox--small').addClass('text-invisible');

        $(temp).next().removeClass('text-invisible');
    }else {
        $(temp).next().addClass('text-invisible');
    }

}

function showText(temp) {
    if($("."+temp.id+"--text").hasClass('text-invisible')){
        $('.textbox--small').addClass('text-invisible');
        $("."+temp.id+"--text").removeClass('text-invisible');
    }else {
        $("."+temp.id+"--text").addClass('text-invisible');
    }
}

function colorImage(temp){
    $(temp).find('img').removeClass('disabled');
    $(temp).find('.circle__text').removeClass('circle__text--black');
}

function blackImage(temp){
    $(temp).find('img').addClass('disabled');
    $(temp).find('.circle__text').addClass('circle__text--black');

}



function moveSlider(temp) {
    $('.sport_chap4--q1__2').css('width',temp.value+"%");
}

function showTableRow(temp){
    if($('.'+temp.id+"--item").hasClass('my-table__row--invisible')){
        $('.'+temp.id+"--item").removeClass('my-table__row--invisible');
    }else{
        $('.'+temp.id+"--item").addClass('my-table__row--invisible');
    }
}
