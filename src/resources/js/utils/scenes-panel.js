define([
    'jquery',
    'underscore',
    'mustache',
    'src/resources/js/holodeck/holodeck',
    'src/resources/js/holodeck/cocoa',
    //'src/resources/js/holodeck/mock',
    'src/resources/js/utils/scene-designer',
    'src/resources/js/utils/scene-item'
], function($, _, Mustache, HolodeckClient, HolodeckResource, Designer, SceneItem){

    var $view = $('.panel.hue-scenes');
    var $exportScenes = false;
    var $addScene = false;
    var $removeScene = false;

    var $availableScenes=false;
    var scenes = [];
    var holodeck = false;

    function init(){

        $addScene = $view.find('#scene-footer-controls .add');
        $removeScene = $view.find('#scene-footer-controls .remove');
        $exportScenes = $view.find('#scene-footer-controls .export');

        $availableScenes = $view.find('#available-scenes');

        HolodeckClient.init(HolodeckResource);
        holodeck = HolodeckClient;

        registerActions();
        createSceneWithNameAndData('Untitled Scene', []);
    }

    function registerActions(){
        $exportScenes.on('click', onExportScenesClicked);
        $addScene.on('click', onAddSceneClicked);
        $removeScene.on('click', onRemoveSceneClicked);
    }

    function onExportScenesClicked(e){
        var data = {};

        _.each(scenes, function(scene){
            var model = scene.model;
            var lights = {};

            _.each(scene.model.lights, function(light){
                var lightModel = light.model;

                lights[lightModel.number] = {
                    'h': parseInt(lightModel.hue, 10),
                    's': parseInt(lightModel.sat, 10),
                    'b': parseInt(lightModel.bri, 10)
                };
            });

            data[model.name] = lights;
        });

        holodeck.saveJSONStringToFile(JSON.stringify(data));
    }

    function onAddSceneClicked(e){
       createSceneWithNameAndData('Untitled Scene', []);
    }

    function onRemoveSceneClicked(e){
        return;
    }

    function onSceneClicked(e){
        var scene = e.data.context;


        if (shouldChangeToScene(scene)){
            var currentScene = Designer.getCurrentScene();
            currentScene.$view.removeClass('selected');
            scene.$view.addClass('selected');
            Designer.setCurrentScene(scene);
        }
    }

    function shouldChangeToScene(scene){
        var currentScene = Designer.getCurrentScene();

        if (currentScene === scene){
            return false;
        }

        return true;
    }

    function createSceneWithNameAndData(name, data){

        var sceneData = {'name': name,
                         'lights': data};

        var scene = new SceneItem(sceneData);
        scenes.push(scene);

        $availableScenes.append(scene.$view);

        scene.$view.on('click', {'context': scene}, onSceneClicked);
        scene.$view.addClass('selected');

        var currentScene = Designer.getCurrentScene();

        if(currentScene){
            currentScene.$view.removeClass('selected');
        }

        Designer.setCurrentScene(scene);
    }

    function viewWillAppear(){}
    function viewWillDisappear(){}
    function viewDidLoad(){}

    init();

    return {
        '$view': $view,
        'viewWillAppear': viewWillAppear,
        'viewWillDisappear': viewWillDisappear,
        'createSceneWithNameAndData': createSceneWithNameAndData
    };
});
