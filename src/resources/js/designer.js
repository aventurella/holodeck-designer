require([
    'src/resources/js/utils/menu',
    'src/resources/js/utils/scene-designer',
    'src/resources/js/hue/hue',
    'src/resources/js/hue/cocoa',
    //'src/resources/js/hue/mock',
    'bootstrap',
    'requireLib'
], function(MainMenu, SceneDesigner, HueClient, HueResource){



    var mainMenu = MainMenu;
    var sceneDesigner = SceneDesigner;

    HueClient.init(HueResource);
    HueClient.getHues(loadHuesComplete);

    function loadHuesComplete(data){
        mainMenu.setHues(data);
    }
});
