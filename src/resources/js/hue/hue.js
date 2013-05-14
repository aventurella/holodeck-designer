define([], function(){

    var resource = false;

    function init(hueResource){
        resource = hueResource;
    }

    function getLights(account, callback){
        return resource.getLights(account, callback);
    }

    function getHues(callback){
        return resource.getHues(callback);
    }

    return {
        'init': init,
        'getLights': getLights,
        'getHues': getHues
    };
});
