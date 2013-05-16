define([
    'jquery',
    'src/resources/js/hue/hue',
    //'src/resources/js/hue/cocoa'
    'src/resources/js/hue/mock'
], function($, HueClient, HueResource){

    var $view = $('.panel.hue-control');
    var $colorView = false;
    var $colorBlock = false;
    var $colorControls = false;
    var $hSlider = false;
    var $hInput = false;
    var $sSlider = false;
    var $sInput = false;
    var $vSlider = false;
    var $vInput = false;

    var $dragImage = false;

    function init(){
        $view = $('.panel.hue-control');
        $hostInput = $view.find('select[name="host"]');
        $usernameInput = $view.find('input[name="username"]');
        $availableLights = $('#available-lights-select');

        $view.find('.btn').on('click', onLoadLightsClick);
        HueClient.init(HueResource);

        hue = HueClient;
        viewDidLoad();
    }

    function onLoadLightsClick(e){
        account = getHueCredentials();
        var lights = hue.getLights(account, loadLightsComplete);
    }

    function getHueCredentials(){
        return {
            'host': $hostInput.val(),
            'username': $usernameInput.val()
        };
    }

    function loadLightsComplete(data){

        invalidateLights();

        $.each(data, function(key, value){
            var name = 'Light ' + value.number;

            if (value.name){
                name = value.name;
            }

            $availableLights
            .append($('<option></option>')
            .attr('value', value.number)
            .text(name));
        });
    }

    function invalidateLights(){
        $availableLights.html('');
    }

    function loadHuesComplete(data){
        hueList = data;
        $.each(data, function(key, value){
            $hostInput
            .append($('<option></option>')
            .attr('value', value.host)
            .text(value.host));
        });
    }

    function colorStartedDragging(e){
        var dataTransfer = e.originalEvent.dataTransfer;

        dataTransfer.effectAllowed = 'copy';
        var data = HSBValue();

        dataTransfer.setData('application/x-light-color', JSON.stringify(data));
        dataTransfer.setDragImage($dragImage[0], 25, 25);
    }

    function colorStoppedDragging(e){
        // pass
    }

    function viewWillAppear(){}
    function viewWillDisappear(){}

    // LIVING IN SIN BEYOND THIS POINT, I'M SORRY FOR REPEATING CODE!
    function viewDidLoad(){
        hue.getHues(loadHuesComplete);
        // I'm gonna come right out and say it...
        // I'm not thrilled with his duplication of code from
        // scene-light. This will need to be refactored later
        // DRY it up. For now though, we live in sin.

        $colorView = $view.find('.color-view');
        $colorBlock = $colorView.find('.color-block');
        $dragImage = $colorView.find('.drag-image');
        $colorControls = $colorView.find('.color-controls');
        $hSlider = $colorControls.find('input[name="h-slider"]');
        $hInput = $colorControls.find('input[name="h-input"]');
        $sSlider = $colorControls.find('input[name="s-slider"]');
        $sInput = $colorControls.find('input[name="s-input"]');
        $vSlider = $colorControls.find('input[name="v-slider"]');
        $vInput = $colorControls.find('input[name="v-input"]');

        registerSliderActions();

        updateDragImage(HSBValue());

        $colorBlock.on('dragstart', colorStartedDragging);
        $colorBlock.on('dragend', colorStoppedDragging);
    }

    function registerSliderActions(){
        $hSlider.on('change', onHueSliderChanged);
        $sSlider.on('change', onSatSliderChanged);
        $vSlider.on('change', onValSliderChanged);

        $hInput.on('blur', onHueInputChanged);
        $sInput.on('blur', onSatInputChanged);
        $vInput.on('blur', onValInputChanged);
    }

    function HSBValue() {
        var h = $hSlider.val();
        var s = $sSlider.val();
        var b = $vSlider.val();

        return {'hue': h, 'sat': s, 'bri': b};
    }

    function updateDragImage(color){
        var canvas = document.createElement('canvas');
        var img = document.createElement('img');
        canvas.width = canvas.height = 50;

        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'hsl(' + color.hue + ',' + color.sat + '%,' + color.bri + '%)';
        ctx.fillRect (0, 0, 50, 50);

        $dragImage.attr('src', canvas.toDataURL());
    }

    function updateColorWithHSB(color) {
        var h = color.hue;
        var s = color.sat;
        var b = color.bri;

        $colorBlock.css({'background-color': 'hsl(' + h + ', ' + s + '%, ' + b + '%)'});
        updateDragImage(color);
    }

    function onHueSliderChanged(e){
        $hInput.val($hSlider.val());

        colors = HSBValue();
        updateColorWithHSB(colors);
    }

    function onSatSliderChanged(e){
        var colors;

        $sInput.val($sSlider.val());

        colors = HSBValue();
        updateColorWithHSB(colors);
    }

    function onValSliderChanged(e){
        var colors;

        $vInput.val($vSlider.val());

        colors = HSBValue();
        updateColorWithHSB(colors);
    }

    function onHueInputChanged(e){
        var colors;

        $hSlider.val($hInput.val());

        colors = HSBValue();
        updateColorWithHSB(colors);
    }

    function onSatInputChanged(e){
        var colors;

        $sSlider.val($sInput.val());

        colors = HSBValue();
        updateColorWithHSB(colors);
    }

    function onValInputChanged(e){
        var colors;

        $vSlider.val($vInput.val());

        colors = HSBValue();
        updateColorWithHSB(colors);
    }

    init();

    return {
        '$view': $view,
        'viewWillAppear': viewWillAppear,
        'viewWillDisappear': viewWillDisappear
    };
});
