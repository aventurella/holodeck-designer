define([
    'jquery',
    'underscore',
    'src/resources/js/utils/lights-panel',
    'src/resources/js/utils/control-panel'
], function($, _, LightsPanel, ControlPanel){

    var currentPanel = false;
    var isAnimating = false;
    // hold for potential future use.
    //var transitionIn = 'panel-move-from-right';
    //var transitionOut = 'panel-move-to-left';

    var animationEndEvent = 'webkitTransitionEnd';
    var $leftMenu = $('.cbp-vimenu');
    var $submenus = $leftMenu.find('a[data-tag]');

    function init(){
        initializeMenu();
    }

    function initializeMenu(){
        currentPanel = LightsPanel;
        $submenus.on('click', _.bind(onLeftMenuItemClick, this));
    }

    function onLeftMenuItemClick(event){
        event.preventDefault();

        var tag = $(event.target).data('tag');
        var panel = panelForTag(tag);

        if (shouldTransitionPanel(panel)){
            transitionPanelFromTo(currentPanel, panel);
        }
    }

    function shouldTransitionPanel(panel){
        if (!panel) {return false;}
        if (panel == currentPanel) {return false;}
        if (isAnimating) {return false;}

        return true;
    }

    function transitionPanelFromTo(outPanel, inPanel){
        isAnimating = true;

        outPanel.$view.removeClass('current');
        currentPanel = inPanel;

        inPanel.$view
        .addClass('current')
        .on(animationEndEvent, function(){
            inPanel.$view.off(animationEndEvent);
            onAnimationEnd(outPanel, inPanel);
        });
    }

    function onAnimationEnd(outPanel, inPanel) {
        console.log('onAnimationEnd');
        isAnimating = false;
    }

    function panelForTag(tag){

        data = {
            'hue-lights': LightsPanel,
            'hue-control': ControlPanel
        };

        return data[tag] || false;
    }

    init();

    return {
        'shouldTransitionPanel': shouldTransitionPanel,
        'transitionPanelFromTo': transitionPanelFromTo,

        'panels': {
            'lightsPanel': LightsPanel,
            'controlPanel': ControlPanel
        }
    };
});
