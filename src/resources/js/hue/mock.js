define([], function(){

    var _bridge = window.JSHue;

    function getLights(account, callback){
        return _bridge.lights(account, callback);
    }

    function getHues(callback){

        callback([
            {'hueId': 1,
            'host': '127.0.0.1',
            'macAddress': 'abcdef',
            'username': ''},

            {'hueId': 2,
            'host': '127.0.0.2',
            'macAddress': 'abcdef',
            'username': ''},

            {'hueId': 3,
            'host': '127.0.0.3',
            'macAddress': 'abcdef',
            'username': ''}]);
    }

    return {
        'getLights': getLights,
        'getHues': getHues
    };
});
