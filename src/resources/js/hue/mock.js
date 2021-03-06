define([], function(){

    var _bridge = window.JSHue;

    function getLights(account, callback){
        console.log('getLights');
        callback([
            {'number': 1,
             'name': 'Clark\'s Room'},

            {'number': 2,
             'name': 'Living Room'},

            {'number': 3,
             'name': 'Lucy\'s Room'},

            {'number': 4,
             'name': 'Ollie\'s Room'},

            {'number': 5,
             'name': 'Nook'},

            {'number': 6,
             'name': 'Truman\'s Room'},

            {'number': 7,
             'name': 'Robofish\'s Room'},

            {'number': 8,
             'name': 'Master Bedroom'},

            {'number': 9,
             'name': 'Kitchen'},

            {'number': 10,
             'name': 'Laundry Room'}]);
    }

    function getHues(callback){
        console.log('getHues');
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

    function setLightStateForId(account, data, lightId){
        console.log('setLightStateForId');
        console.log(account, data, lightId);
    }

    return {
        'getLights': getLights,
        'getHues': getHues,
        'setLightStateForId': setLightStateForId
    };
});
