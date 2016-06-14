var Main = {};
Main.controller = {};

Main.makeProfile = function(){

    console.log(new Main.profile.Profile());

};

Main.init = function(){
    Main.controller.indexView.init();
};



window.addEventListener("DOMContentLoaded", Main.init);
