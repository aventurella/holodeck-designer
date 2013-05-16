define([
    'jquery',
    'underscore',
    'mustache',
    'src/resources/js/utils/scene-light'
], function($, _ , Mustache, SceneLight){

    var $view = false;
    var $dropMask = false;
    var $sceneLights = false;
    //var lightTemplate = false;
    var currentLights = {};


    function init(){
        $view = $('#scene-designer');
        $dropMask = $('#drop-notification');

        $view.on('dragenter', onLightEnter);
        $dropMask.on('dragleave', onLightLeave);
        $dropMask.on('drop', onLightDrop);
        $view.on('dragover', onLightOver);

        $sceneLights = $('#scene-lights-list');

        //lightTemplate = Mustache.compile($('#scene-light-template').html());
    }

    function onLightEnter(e){
        if (isBridgeLight(e)){
            $dropMask.addClass('droptarget');
        }
    }

    function onLightLeave(e){
        //$view.removeClass('droptarget');
        $dropMask.removeClass('droptarget');
    }

    function isBridgeLight(e){
        var dataTransfer = e.originalEvent.dataTransfer;
        var status = false;

        if (dataTransfer.types){
            status = dataTransfer.types[0] == 'application/x-bridge-light';
        }

        return status;
    }

    function onLightOver(e){

        if (isBridgeLight(e)){
            e.preventDefault();
            e.originalEvent.dataTransfer.dropEffect = 'copy';
        }
    }

    function onLightDrop(e){
        if (!isBridgeLight(e)){
            return;
        }

        e.preventDefault();
        $('#drop-notification').removeClass('droptarget');

        var dataTransfer = e.originalEvent.dataTransfer;
        var data = JSON.parse(
            dataTransfer.getData('application/x-bridge-light'));

        var existingLight = currentLights[data.number];
        if (existingLight){
            return;
        }

        addLightForModel(data);
    }

    function addLightForModel(model){
        var light = new SceneLight(model);

        currentLights[model.number] = light;
        //registerLight(light);
        $sceneLights.append(light.$view);
    }

    // function registerLight(light){
    //     light.find('.color-block').on('click', light, onColorBlockClicked);
    // }

    function onColorBlockClicked(e){
        console.log(e);
        console.log(e.data);

    }

    function transitionToColorControl(light){

    }

    function transitionFromColorControl(light){

    }

    init();

    return {
        '$view': $view
    };
});
