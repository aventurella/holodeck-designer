define([
    'jquery',
    'underscore',
    'src/resources/js/utils/lights-panel',
    'src/resources/js/utils/control-panel',
    'src/resources/js/utils/scenes-panel'
], function($, _, LightsPanel, ControlPanel, ScenesPanel){

    var currentPanel = false;
    var isAnimating = false;

    var transitionIn = 'panel-move-from-right';
    var transitionOut = 'panel-move-to-left';

    var animationEndEvent = 'webkitAnimationEnd';
    var $leftMenu = $('.cbp-vimenu');
    var $submenus = $leftMenu.find('a[data-tag]');

    function init(){
        initializeMenu();
    }

    function initializeMenu(){
        currentPanel = LightsPanel;
        currentPanel.viewWillAppear();

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

        inPanel.viewWillAppear();
        outPanel.viewWillDisappear();

        outPanel.$view
        .addClass(transitionOut)
        .on(animationEndEvent, function(){
            outPanel.$view
            .off(animationEndEvent)
            .removeClass('current')
            .removeClass(transitionOut);
        });

        currentPanel = inPanel;

        inPanel.$view
        .addClass('current')
        .addClass(transitionIn)
        .on(animationEndEvent, function(){
            inPanel.$view
            .off(animationEndEvent)
            .removeClass(transitionIn);
            onAnimationEnd(outPanel, inPanel);
        });
    }

    function onAnimationEnd(outPanel, inPanel) {
        isAnimating = false;
    }

    function setHues(data){
        LightsPanel.setHues(data);
        ControlPanel.setHues(data);
    }


    function panelForTag(tag){

        data = {
            'hue-lights': LightsPanel,
            'hue-control': ControlPanel,
            'hue-scenes': ScenesPanel
        };

        return data[tag] || false;
    }

    init();

    return {
        'shouldTransitionPanel': shouldTransitionPanel,
        'transitionPanelFromTo': transitionPanelFromTo,
        'setHues': setHues,

        'panels': {
            'lightsPanel': LightsPanel,
            'controlPanel': ControlPanel,
            'scenesPanel': ScenesPanel
        }
    };
});
