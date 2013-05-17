define([], function(){

    function saveJSONStringToFile(data){
        console.log('saveJSONStringToFile', data);
    }

    return {
        'saveJSONStringToFile': saveJSONStringToFile
    };
});
