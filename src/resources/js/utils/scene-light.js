define([
    'jquery',
    'mustache'
], function($, Mustache){

    lightTemplate = Mustache.compile($('#scene-light-template').html());


    function onColorBlockClicked(e){
        var ctx = e.data.context;
        if (ctx.shouldTransitionToColorControl()){
            ctx.transitionToColorControl();
            return;
        }

        if (ctx.shouldTransitionFromColorControl()){
            ctx.transitionFromColorControl();
        }
    }

    function onHueSliderChanged(e){
        var ctx = e.data.context;
        ctx.$hInput.val(ctx.$hSlider.val());

        colors = ctx.hsbValue();
        ctx.updateColorWithHSB(colors);
    }

    function onSatSliderChanged(e){
        var ctx = e.data.context;
        var colors;

        ctx.$sInput.val(ctx.$sSlider.val());

        colors = ctx.hsbValue();
        ctx.updateColorWithHSB(colors);
    }

    function onValSliderChanged(e){
        var ctx = e.data.context;
        var colors;

        ctx.$vInput.val(ctx.$vSlider.val());

        colors = ctx.hsbValue();
        ctx.updateColorWithHSB(colors);
    }

    function onHueInputChanged(e){
        var ctx = e.data.context;
        var colors;

        ctx.$hSlider.val(ctx.$hInput.val());

        colors = ctx.hsbValue();
        ctx.updateColorWithHSB(colors);
    }

    function onSatInputChanged(e){
        var ctx = e.data.context;
        var colors;

        ctx.$sSlider.val(ctx.$sInput.val());

        colors = ctx.hsbValue();
        ctx.updateColorWithHSB(colors);
    }

    function onValInputChanged(e){
        var ctx = e.data.context;
        var colors;

        ctx.$vSlider.val(ctx.$vInput.val());

        colors = ctx.hsbValue();
        ctx.updateColorWithHSB(colors);
    }

    // Start with the constructor
    function SceneLight(model) {
        this.$view = $(lightTemplate(model));
        this.$colorView = this.$view.find('.color-view');
        this.$colorBlock = this.$colorView.find('.color-block');
        this.$colorControls = this.$colorView.find('.color-controls');
        this.$hSlider = this.$colorControls.find('input[name="h-slider"]');
        this.$hInput = this.$colorControls.find('input[name="h-input"]');
        this.$sSlider = this.$colorControls.find('input[name="s-slider"]');
        this.$sInput = this.$colorControls.find('input[name="s-input"]');
        this.$vSlider = this.$colorControls.find('input[name="v-slider"]');
        this.$vInput = this.$colorControls.find('input[name="v-input"]');

        this.showColorControl = false;
        this.model = model;
        this.registerActions();
    }

    SceneLight.prototype.registerActions = function() {
        this.$colorBlock.on('click', {'context': this}, onColorBlockClicked);
        this.$hSlider.on('change', {'context': this}, onHueSliderChanged);
        this.$sSlider.on('change', {'context': this}, onSatSliderChanged);
        this.$vSlider.on('change', {'context': this}, onValSliderChanged);

        this.$hInput.on('blur', {'context': this}, onHueInputChanged);
        this.$sInput.on('blur', {'context': this}, onSatInputChanged);
        this.$vInput.on('blur', {'context': this}, onValInputChanged);

        // <div class="control">
        //                     <label>H:</label>
        //                     <input type="range" class="hue-slider" name="h-slider" min="0" max="360">
        //                     <input type="text" name="h-input" value="0" maxlength="3">
        //                 </div>

        //                 <div class="control">
        //                     <label>S:</label>
        //                     <input type="range" name="s-slider" value="0" min="0" max="100">
        //                     <input type="text" name="s-input" value="0" maxlength="3">
        //                 </div>

        //                 <div class="control">
        //                     <label>V:</label>
        //                     <input type="range" name="v-slider" value="0" min="0" max="100">
        //                     <input type="text" name="v-input" value="0" maxlength="3">
        //                 </div>
    };

    SceneLight.prototype.shouldTransitionToColorControl = function() {
        if (!this.showsColorControl){
            return true;
        }
    };

    SceneLight.prototype.shouldTransitionFromColorControl = function() {
        if (this.showsColorControl){
            return true;
        }
    };

    SceneLight.prototype.transitionToColorControl = function() {
        this.showsColorControl = true;
        this.$colorView.addClass('color-move-to-left');
    };

    SceneLight.prototype.transitionFromColorControl = function() {
        this.showsColorControl = false;
        //this.$colorView.addClass('color-move-from-left');
        this.$colorView.removeClass('color-move-to-left');
    };

    SceneLight.prototype.hsbValue = function() {
        var h = this.$hSlider.val();
        var s = this.$sSlider.val();
        var b = this.$vSlider.val();

        return {'hue': h, 'sat': s, 'bri': b};
    };

    SceneLight.prototype.updateColorWithHSB = function(colors) {
        var h = colors.hue;
        var s = colors.sat;
        var b = colors.bri;

        this.$colorBlock.css({'background-color': 'hsl(' + h + ', ' + s + '%, ' + b + '%)'});
    };


    // etc.


    // var $view = $('.panel.hue-control');

    // function init(light){

    //     viewDidLoad()
    // }

    // function viewWillAppear(){}
    // function viewWillDisappear(){}
    // function viewDidLoad(){}

    // init();

    return SceneLight;
});
