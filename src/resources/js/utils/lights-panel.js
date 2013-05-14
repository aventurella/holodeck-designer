define([
    'jquery',
    'src/resources/js/hue/hue',
    'src/resources/js/hue/cocoa'
    //'src/resources/js/hue/mock'
], function($, HueClient, HueResource){

    var $view = $('.panel.hue-lights');
    var $hostInput = $view.find('select[name="host"]');
    var $usernameInput = $view.find('input[name="username"]');

    var hue = false;
    var hueList = [];


    function init(){
        $view.find('.btn').on('click', onLoadLights);
        HueClient.init(HueResource);

        hue = HueClient;
        viewDidLoad();
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
        return {
            'host': $hostInput.val(),
            'username': $usernameInput.val()
        };
    }

    function loadHuesComplete(data){
        hueList = data;
        $.each(data, function(key, value){
            $hostInput
            .append($('<option></option>')
            .attr('value', value.host)
            .text(value.host));
        });
    }

    function viewWillAppear(){}
    function viewWillDisappear(){}
    function viewDidLoad(){
        hue.getHues(loadHuesComplete);
    }

    init();
    return {
        '$view': $view,
        'viewWillAppear': viewWillAppear,
        'viewWillDisappear': viewWillDisappear
    };
});
