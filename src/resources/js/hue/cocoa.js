define([], function(){

    var _bridge = window.JSHue;

    function getLights(account, callback){
        return _bridge.lights(account, callback);
    }

    function getHues(callback){
        return _bridge.hues(callback);
    }

    return {
        'getLights': getLights,
        'getHues': getHues
    };
});
