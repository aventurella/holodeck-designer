define([], function(){

    var resource = false;

    function init(holodeckResource){
        resource = holodeckResource;
    }

    function saveJSONStringToFile(data){
        return resource.saveJSONStringToFile(data);
    }

    return {
        'init': init,
        'saveJSONStringToFile': saveJSONStringToFile,
    };
});
