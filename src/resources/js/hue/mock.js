define([], function(){

    var _bridge = window.JSHue;

    function getLights(account, callback){
        callback([
            {'number': 1,
             'name': 'Clark\'s Room'},

            {'number': 2,
             'name': 'Living Room'},

            {'number': 3,
             'name': 'Lucy\'s Room'}]);
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
