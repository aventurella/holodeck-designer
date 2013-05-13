define([
    'jquery',
    'src/resources/js/hue/hue',
    'src/resources/js/hue/cocoa'
], function($, HueClient, HueResource){

    var $view = $('.panel.hue-lights');
    var hue = false;


    function init(){
        $view.find('.btn').on('click', onLoadLights);
        console.log(HueClient, HueResource);
        HueClient.init(HueResource);

        hue = HueClient;
    }

    function onLoadLights(e){
        account = getHueCredentials();
        var lights = hue.getLights(account);

        $target = $('#sortable1');
        for(var i=0; i < lights.length; i++){
            var light = lights[i];
            $target.append('<li>' + light.number + '</li>');
        }
    }

    function getHueCredentials(){
        var host = $view.find('select[name="host"]').val();
        var username = $view.find('input[name="username"]').val();

        return {
            'host': host,
            'username': username
        };
    }

    init();
    return {
        '$view': $view
    };
});
