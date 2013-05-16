define([], function(){

    var resource = false;

    function init(holodeckResource){
        resource = holodeckResource;
    }

    function saveSceneToFile(data){
        return resource.saveSceneToFile(data);
    }

    return {
        'init': init,
        'saveSceneToFile': saveSceneToFile,
    };
});
