require([
    'jquery',
    'underscore',
    'bootstrap',
    'requireLib'
], function($, _, Mustache){

    var currentPanel = false;
    var panelContext = false;
    var transitionIn = 'panel-move-from-right';
    var transitionOut = 'panel-move-to-left';
    var isAnimating = false;
    var animationEndEvent = 'webkitAnimationEnd';

    function initialize(){
        initializeMenu();
        panelContext = $('.column.controls');
        currentPanel = panelForClass('hue-lights');
    }

    function initializeMenu(){
        var lightItem = $('.menu .cbp-vimenu .menu-light');
        var controlItem = $('.menu .cbp-vimenu .menu-gear');

        lightItem.on('click', onLightsClicked);
        controlItem.on('click', onControlClicked);
    }

    function onLightsClicked(e){
        e.preventDefault();
        nextPanel = panelForClass('hue-lights');

        if(shouldTransitionPanel(nextPanel)){
            transitionPanelFromTo(currentPanel, nextPanel);
        }
    }

    function onControlClicked(e){
        e.preventDefault();
        nextPanel = panelForClass('hue-control');

        if(shouldTransitionPanel(nextPanel)){
            transitionPanelFromTo(currentPanel, nextPanel);
        }
    }

    function shouldTransitionPanel(nextPanel){

        if( isAnimating ) {
            return false;
        }

        var nextParts = nextPanel.attr('class').split(' ');
        var currentParts = currentPanel.attr('class').split(' ');

        var nextId = _.filter(
            nextParts,
            function(each){ return each.match(/^hue-/); });

        var currentId = _.filter(
            currentParts,
            function(each){ return each.match(/^hue-/); });

        if (nextId[0] != currentId[0]){
            isAnimating = true;
            return true;
        }

        return false;
    }

    function transitionPanelFromTo(outPanel, inPanel){

        inPanel.addClass('current');

        outPanel.addClass(transitionOut).on(
            animationEndEvent,
            function(){
                outPanel.off(animationEndEvent);
            }
        );

        inPanel.addClass(transitionIn).on(
            animationEndEvent,
            function(){
                inPanel.off(animationEndEvent);
                onAnimationEnd(outPanel, inPanel);
            }
        );
    }

    function onAnimationEnd(outPanel, inPanel){
        currentPanel = inPanel;
        isAnimating = false;
        resetPanel(outPanel, inPanel);
    }

    function resetPanel( outPanel, inPanel ) {
        outPanel.removeClass('current');
        outPanel.removeClass(transitionOut);

        inPanel.removeClass(transitionIn);
    }


    function panelForClass(className){
        return panelContext.find('.' + className);
    }

    initialize();

});
