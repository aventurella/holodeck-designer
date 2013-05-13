define([], function(){

    var resource = false;

    function init(hueResource){
        resource = hueResource;
    }

    function getLights(account){
        return resource.getLights(account);
    }

    return {
        'init': init,
        'getLights': getLights
    };
});
