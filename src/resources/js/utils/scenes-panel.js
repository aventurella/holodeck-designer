define([
    'jquery',
    'underscore',
    'mustache',
    'src/resources/js/hue/hue',
    //'src/resources/js/hue/cocoa'
    'src/resources/js/hue/mock',
    'src/resources/js/utils/scene-designer'
], function($, _, Mustache, HueClient, HueResource, Designer){

    var $view = $('.panel.hue-scenes');
    var $exportScene = false;

    function init(){
        $exportScene = $view.find('.controls .btn');
        registerActions();
    }

    function registerActions(){
        $exportScene.on('click', onExportSceneClicked);
    }

    function onExportSceneClicked(e){
        console.log('export');
        console.log(Designer.getCurrentScene());
    }

    function viewWillAppear(){}
    function viewWillDisappear(){}
    function viewDidLoad(){

    }

    init();

    return {
        '$view': $view,
        'viewWillAppear': viewWillAppear,
        'viewWillDisappear': viewWillDisappear
    };
});
