var Main = {};
Main.controller = {};

Main.makeProfile = function(){

    console.log(new Main.profile.Profile());

};

Main.init = function(){
    Main.controller.indexView.init();

    Main.controller.headerController.hide();
    Main.controller.sidebarController.hide();
};



window.addEventListener("DOMContentLoaded", Main.init);
