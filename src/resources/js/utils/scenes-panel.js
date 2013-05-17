define([
    'jquery',
    'underscore',
    'mustache',
    'src/resources/js/holodeck/holodeck',
    'src/resources/js/holodeck/cocoa',
    //'src/resources/js/holodeck/mock',
    'src/resources/js/utils/scene-designer'
], function($, _, Mustache, HolodeckClient, HolodeckResource, Designer){

    var $view = $('.panel.hue-scenes');
    var $exportScene = false;
    var holodeck = false;

    function init(){
        $exportScene = $view.find('.controls .btn');

        HolodeckClient.init(HolodeckResource);
        holodeck = HolodeckClient;
        registerActions();
    }

    function registerActions(){
        $exportScene.on('click', onExportSceneClicked);
    }

    function onExportSceneClicked(e){
        var data = Designer.getCurrentScene();
        console.log(Designer.getCurrentScene());
        holodeck.saveSceneToFile(JSON.stringify(data));
    }

    function viewWillAppear(){}
    function viewWillDisappear(){}
    function viewDidLoad(){}

    init();

    return {
        '$view': $view,
        'viewWillAppear': viewWillAppear,
        'viewWillDisappear': viewWillDisappear
    };
});
