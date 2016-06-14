/**
 * Created by flori on 11.06.2016.
 */

var Main = Main || {};

Main.profile = (function() {

    var currentProfile

    ;

    this.Profile = function(profile) {

        var data = profile ? this.load(profile) : {};




        this.save = function(){


            var content = window.btoa(JSON.stringify(data));

            // download profile file
            var downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob([content], {type: 'text/svg'}));
            downloadLink.download = data.name.replace(/\W/, '') + '.WBTprofile';

            // Append anchor to body.
            document.body.appendChild(downloadLink);
            downloadLink.click();

            // Remove anchor from body
            document.body.removeChild(downloadLink);

        };

        this.load = function(profile){



        };

        Main.currentProfile = this;


        return this;



    };

    return this;


})();