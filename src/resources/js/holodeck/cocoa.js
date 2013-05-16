define([], function(){

    var _bridge = window.JSHolodeck;

    function saveSceneToFile(data){
        return _bridge.saveSceneToFile(data);
    }

    function setLightStateForId(account, data, lightId){

        data.hue = data.hue * 182.028;
        data.sat = (data.sat / 100) * 255;
        data.bri = (data.bri / 100) * 255;

        _bridge.setLightStateForId(account, data, lightId);
    }

    return {
        'saveSceneToFile': saveSceneToFile
    };
});
