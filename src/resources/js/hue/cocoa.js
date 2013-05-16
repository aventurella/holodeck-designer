define([], function(){

    var _bridge = window.JSHue;

    function getLights(account, callback){
        return _bridge.lights(account, callback);
    }

    function getHues(callback){
        return _bridge.hues(callback);
    }

    function setLightStateForId(account, data, lightId){

        data.hue = data.hue * 182.028;
        data.sat = (data.sat / 100) * 255;
        data.bri = (data.bri / 100) * 255;

        _bridge.setLightStateForId(account, data, lightId);
    }

    return {
        'getLights': getLights,
        'getHues': getHues,
        'setLightStateForId': setLightStateForId
    };
});
