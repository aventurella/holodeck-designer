define([], function(){

    var _bridge = window.JSHolodeck;

    function saveJSONStringToFile(data){
        return _bridge.saveJSONStringToFile(data);
    }

    return {
        'saveJSONStringToFile': saveJSONStringToFile
    };
});
