/**
 * Created by flori on 13.06.2016.
 */

var abstractViewController = function(id){

    this.hide = function(){
        $(id).hide();
    };

    this.show = function(){
        $(id).show();
    };

    return this;

};