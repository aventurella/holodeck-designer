define([
    'jquery'
], function($){

    var $view = $('#scene-designer');

    function init(){
        $view.on('dragenter', onLightEnter);
        $view.on('dragleave', onLightLeave);
        $view.on('drop', onLightDrop);
        $view.on('dragover', onLightOver);
    }

    function onLightEnter(e){
        $view.addClass('droptarget');
    }

    function onLightLeave(e){
        $view.removeClass('droptarget');
    }

    function onLightOver(e){

        var dataTransfer = e.originalEvent.dataTransfer;
        var isBridgeLight = dataTransfer.types[0] == 'application/x-bridge-light';

        if (isBridgeLight){
            e.preventDefault();
            e.originalEvent.dataTransfer.dropEffect = 'copy';
        }
    }

    function onLightDrop(e){
        e.preventDefault();
        var dataTransfer = e.originalEvent.dataTransfer;
        var data = dataTransfer.getData('application/x-bridge-light');

        console.log(JSON.parse(data));
        $view.removeClass('droptarget');
    }

    init();

    return {
        '$view': $view
    };
});
