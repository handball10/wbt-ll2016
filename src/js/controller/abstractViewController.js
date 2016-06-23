/**
 * Created by flori on 13.06.2016.
 */

var abstractViewController = function(id){

    var container = typeof id === 'string' ? $(id) : id;

    var hide = function(){
        container.hide();
    };

    var show = function(){
        container.show();
    };

    var fadeOut = function(duration){
        container.fadeOut(duration || 200);
    };

    var fadeIn = function(duration){
        container.fadeIn(duration || 200);
    };

    return {
        hide : hide,
        show : show,
        fadeOut : fadeOut,
        fadeIn : fadeIn,
        container : container
    }

};