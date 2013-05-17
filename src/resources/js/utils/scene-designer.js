define([
    'jquery',
    'underscore',
    'mustache',
    'src/resources/js/utils/scene-light'
], function($, _ , Mustache, SceneLight){

    var $view = false;
    var $dropMask = false;
    var $sceneLights = false;
    var $titleLabel = false;
    var $titleField = false;
    var currentLights = {};
    var currentScene = false;


    function init(){
        $view = $('#scene-designer');
        $dropMask = $('#drop-notification');

        $view.on('dragenter', onLightEnter);
        $dropMask.on('dragleave', onLightLeave);
        $dropMask.on('drop', onLightDrop);
        $view.on('dragover', onLightOver);


        $sceneLights = $('#scene-lights-list');
        $titleLabel = $view.find('.scene-title label');
        $titleField = $view.find('.scene-title input[type="text"]');



        $titleLabel.on('click', onSceneTitleClicked);
        $titleField.on('blur', onSceneTitleBlur);
    }

    function onSceneTitleClicked(e){
        $titleField.val($titleLabel.text());
        $titleLabel.hide();
        $titleField.show();
        $titleField.focus();
    }

    function onSceneTitleBlur(e){
        var value = $titleField.val();

        if (value.length === 0){
            value = 'Untitled Scene';
        }

        currentScene.setName(value);
        $titleLabel.text(value);
        $titleField.hide();
        $titleLabel.show();
    }

    function onLightEnter(e){
        if (isBridgeLight(e)){
            $dropMask.addClass('droptarget');
        }
    }

    function onLightLeave(e){
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

        // var existingLight = currentLights[data.number];
        // if (existingLight){
        //     return;
        // }

        // set default color:
        data.hue = 200;
        data.sat = 100;
        data.bri = 100;

        var light = new SceneLight(data);
        addLight(light);
    }

    function addLight(sceneLight){
        /*
        {
            name: "Clark's Room"
            number: 1
            hue: 360
            sat: 100
            bri: 100
        }
        */

        currentScene.addLight(sceneLight);
        addLightToScene(sceneLight);
    }

    function clearDesignSurface(){
        _.each(currentScene.model.lights, function(value){
            value.viewWillDisappear();
            value.$view.detach();
        });
    }

    function clearScene(){
        if (currentScene){
            clearDesignSurface();
            currentScene.clearLights();
        }
    }

    function getCurrentScene(){
        return currentScene;
    }

    function setCurrentScene(scene){

        if(currentScene){
            clearDesignSurface();
        }

        currentScene = scene;

        setTitle(scene.model.name);
        setLights(scene.model.lights);
    }

    function setTitle(value){
        $titleField.val(value);
        $titleLabel.text(value);
    }

    function setLights(data){
        _.each(data, function(sceneLight){
            /* light.model
                {
                    name: "Clark's Room"
                    number: 1
                    hue: 360
                    sat: 100
                    bri: 100
                }
            */
            // don't use add light
            addLightToScene(sceneLight);
        });
    }

    function addLightToScene(sceneLight){
        sceneLight.viewWillAppear();
        $sceneLights.append(sceneLight.$view);
    }



    init();

    return {
        '$view': $view,
        'getCurrentScene': getCurrentScene,
        'clearScene': clearScene,
        'clearDesignSurface': clearDesignSurface,
        'setTitle': setTitle,
        'setLights': setLights,
        'setCurrentScene': setCurrentScene
    };
});
