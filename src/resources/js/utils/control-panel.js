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

    var debounceLightTimeout;

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

        updateDragImage(HSLValue());

        $colorBlock.on('dragstart', colorStartedDragging);
        $colorBlock.on('dragend', colorStoppedDragging);
        $availableLights.on('change', selectedLightDidChange);
    }

    function selectedLightDidChange(e){
        var hsbColor = HSBValue();
        updateLightWithHSB(hsbColor);
    }

    function registerSliderActions(){
        $hSlider.on('change', onHueSliderChanged);
        $sSlider.on('change', onSatSliderChanged);
        $vSlider.on('change', onValSliderChanged);

        $hInput.on('blur', onHueInputChanged);
        $sInput.on('blur', onSatInputChanged);
        $vInput.on('blur', onValInputChanged);
    }

    function HSLValue(){
        color = HSBValue();

        // we are converting to a value between 0 - 1

        // 0 - 65535
        var hue = (color.hue * 182.028) / 65535;

        // 0 - 255
        var sat = color.sat / 100;

        // 0 - 255
        var val = color.bri / 100;

        // https://gist.github.com/xpansive/1337890

        var nh = hue;
        var ns = sat*val/((hue=(2-sat)*val)<1?hue:2-hue);
        var nv = hue/2;

        return {
            'hue': (nh * 65535) / 182.028,
            'sat': ns * 100,
            'bri': nv * 100};
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
    }

    function updateLightWithHSB(color) {

        var account = getHueCredentials();
        var index = parseInt($availableLights.val(), 10);

        if (debounceLightTimeout){
            clearTimeout(debounceLightTimeout);
        } else {
            // the first pass, so we execute it right away
            // to let the user know something is up.
            // hue.setLightStateForId(account, color, index);
        }

        debounceLightTimeout = setTimeout(function(){
            hue.setLightStateForId(account, color, index);
        },  100);
    }

    function onHueSliderChanged(e){
        $hInput.val($hSlider.val());

        var hsbColor = HSBValue();
        var hslColor = HSLValue();

        updateColorWithHSB(hslColor);
        updateDragImage(hslColor);
        updateLightWithHSB(hsbColor);
    }

    function onSatSliderChanged(e){

        $sInput.val($sSlider.val());

        var hsbColor = HSBValue();
        var hslColor = HSLValue();

        updateColorWithHSB(hslColor);
        updateDragImage(hslColor);
        updateLightWithHSB(hsbColor);
    }

    function onValSliderChanged(e){

        $vInput.val($vSlider.val());

        var hsbColor = HSBValue();
        var hslColor = HSLValue();

        updateColorWithHSB(hslColor);
        updateDragImage(hslColor);
        updateLightWithHSB(hsbColor);
    }

    function onHueInputChanged(e){
        var color;

        $hSlider.val($hInput.val());

        var hsbColor = HSBValue();
        var hslColor = HSLValue();

        updateColorWithHSB(hslColor);
        updateDragImage(hslColor);
        updateLightWithHSB(hsbColor);
    }

    function onSatInputChanged(e){

        $sSlider.val($sInput.val());

        var hsbColor = HSBValue();
        var hslColor = HSLValue();

        updateColorWithHSB(hslColor);
        updateDragImage(hslColor);
        updateLightWithHSB(hsbColor);
    }

    function onValInputChanged(e){

        $vSlider.val($vInput.val());

        var hsbColor = HSBValue();
        var hslColor = HSLValue();

        updateColorWithHSB(hslColor);
        updateDragImage(hslColor);
        updateLightWithHSB(hsbColor);
    }

    init();

    return {
        '$view': $view,
        'viewWillAppear': viewWillAppear,
        'viewWillDisappear': viewWillDisappear
    };
});
