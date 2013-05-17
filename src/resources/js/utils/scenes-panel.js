define([
    'jquery',
    'underscore',
    'mustache',
    'src/resources/js/holodeck/holodeck',
    //'src/resources/js/holodeck/cocoa',
    'src/resources/js/holodeck/mock',
    'src/resources/js/utils/scene-designer',
    'src/resources/js/utils/scene-item'
], function($, _, Mustache, HolodeckClient, HolodeckResource, Designer, SceneItem){

    var $view = $('.panel.hue-scenes');
    var $exportScenes = false;
    var $addScene = false;
    var $removeScene = false;

    var $availableScenes=false;
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
        var data = Designer.getCurrentScene();
        console.log(Designer.getCurrentScene());
        holodeck.saveSceneToFile(JSON.stringify(data));
    }

    function onAddSceneClicked(e){
       return;
    }

    function onRemoveSceneClicked(e){
        return;
    }

    function createSceneWithNameAndData(name, data){

        var model = {'name': name,
                     'lights': data};

        var scene = new SceneItem(model);

        Designer.clearScene();
        Designer.setCurrentScene(scene);
        $availableScenes.append(scene.$view);
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
