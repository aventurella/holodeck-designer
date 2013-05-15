define([
    'jquery',
    'mustache',
    'src/resources/js/hue/hue',
    //'src/resources/js/hue/cocoa'
    'src/resources/js/hue/mock'
], function($, Mustache, HueClient, HueResource){

    var $view = $('.panel.hue-lights');
    var $hostInput = $view.find('select[name="host"]');
    var $usernameInput = $view.find('input[name="username"]');

    var hue = false;
    var hueList = [];
    var lightTemplate = false;
    var currentLights = [];


    function init(){

        $view.find('.btn').on('click', onLoadLightsClick);
        HueClient.init(HueResource);

        lightTemplate = Mustache.compile($('#light-template').html());

        hue = HueClient;
        viewDidLoad();
    }

    function onLoadLightsClick(e){
        account = getHueCredentials();
        var lights = hue.getLights(account, loadLightsComplete);
    }

    function loadLightsComplete(data){
        $target = $('#available-lights');

        invalidateLights();

        $.each(data, function(key, value){
            var name = 'Light ' + value.number;

            if (value.name){
                name = value.name;
            }

            var model = {
                'number': value.number,
                'name': name
            };

            var light = $(lightTemplate(model));
            registerLight(light);
            $target.append(light);
        });
    }

    function registerLight(light){
        currentLights.push(light);
        light.on('dragstart', lightStartedDragging);
        light.on('dragend', lightStoppedDragging);
    }

    function lightStartedDragging(e){
        console.log('STARTED');
        this.style.opacity = '0.4';
        var dataTransfer = e.originalEvent.dataTransfer

        dataTransfer.effectAllowed = 'copy';
        var data = JSON.stringify({'testing': 1});
        dataTransfer.setData('application/x-bridge-light', data);
    }

    function lightStoppedDragging(e){
        console.log('Stopped');
        this.style.opacity = '1';
    }

    function invalidateLights(){
        _.each(currentLights, function(each){
            each.off('dragstart');
            each.remove();
        });

        currentLights = [];
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
