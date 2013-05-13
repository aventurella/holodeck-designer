define([], function(){

    var _bridge = window.JSHue;

    function getLights(account){
        return _bridge.lights(account);
    }

    return {
        'getLights': getLights
    };
});
