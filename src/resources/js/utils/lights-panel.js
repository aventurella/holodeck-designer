define([
    'jquery',
    'underscore',
    'mustache',
    'src/resources/js/hue/hue',
    'src/resources/js/utils/scene-designer'
], function($, _, Mustache, HueClient, Designer){

    var $view = false;
    var $hostInput = false;
    var $usernameInput = false;
    var $availableLights = false;

    var hue = false;
    var hueList = [];
    var lightTemplate = false;
    var currentLights = [];


    function init(){
        $view = $('.panel.hue-lights');
        $hostInput = $view.find('select[name="host"]');
        $usernameInput = $view.find('input[name="username"]');
        $availableLights = $('#available-lights');
        $livePreview = $view.find('input[type="checkbox"][name="live-preview"]');

        $view.find('.btn').on('click', onLoadLightsClick);
        $livePreview.on('change', onToggleLivePreview);

        lightTemplate = Mustache.compile($('#bridge-light-template').html());

        hue = HueClient;
        viewDidLoad();
    }

    function onLoadLightsClick(e){
        account = getHueCredentials();
        var lights = hue.getLights(account, loadLightsComplete);
    }

    function onToggleLivePreview(e){
        Designer.enableLivePreview($livePreview.prop('checked'));
    }

    function loadLightsComplete(data){

        invalidateLights();

        $.each(data, function(key, value){
            var name = 'Light ' + value.number;

            if (value.name){
                name = value.name;
            }

            var model = {
                'number': value.number,
                'name': name,
                'account': getHueCredentials()
            };

            var light = $(lightTemplate(model));
            addLight(light, model);
        });
    }

    function addLight(light, model){
        currentLights.push(light, model);

        light.on('dragstart', model, lightStartedDragging);
        light.on('dragend', lightStoppedDragging);

        $availableLights.append([light, model]);
    }

    function invalidateLights(){
        _.each(currentLights, function(each){
            $light = $(each[0]);
            $light.off('dragstart');
            $light.remove();
        });

        currentLights = [];
    }

    function lightStartedDragging(e){
        this.style.opacity = '0.4';
        var dataTransfer = e.originalEvent.dataTransfer;

        dataTransfer.effectAllowed = 'copy';
        var data = JSON.stringify(e.data);
        dataTransfer.setData('application/x-bridge-light', data);
    }

    function lightStoppedDragging(e){
        this.style.opacity = '1';
    }

    function getHueCredentials(){
        return {
            'host': $hostInput.val(),
            'username': $usernameInput.val()
        };
    }

    function setHues(data){
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
    function viewDidLoad(){}

    init();
    return {
        '$view': $view,
        'viewWillAppear': viewWillAppear,
        'viewWillDisappear': viewWillDisappear,
        'setHues': setHues
    };
});
