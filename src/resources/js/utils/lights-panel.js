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
        $view.find('.btn').on('click', onLoadLightsClick);
        HueClient.init(HueResource);

        hue = HueClient;
        viewDidLoad();
    }

    function onLoadLightsClick(e){
        account = getHueCredentials();
        var lights = hue.getLights(account, loadLightsComplete);
    }

    function loadLightsComplete(data){
        $target = $('#sortable1');
        $.each(data, function(key, value){
            var name = 'Light ' + value.number;

            if (value.name){
                name = value.name;
            }

            $target
            .append($('<li></li>')
            .attr('data-number', value.number)
            .text(name));
        });
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
