require([
    'jquery',
    'underscore',
    'bootstrap',
    'requireLib',
    'jqueryui',
], function($, _, Mustache){

    var currentPanel = false;
    var panelContext = false;
    var transitionIn = 'panel-move-from-right';
    var transitionOut = 'panel-move-to-left';
    var isAnimating = false;
    var animationEndEvent = 'webkitAnimationEnd';
    var $leftMenu = $('.cbp-vimenu')
    var $submenus = $leftMenu.find('a[data-menuclass]')
    var $controls = $('.controls')
    

    function initialize(){
        initializeMenu();
        initializeDragMenu();
        panelContext = $('.column.controls');
    }


    function initializeDragMenu(){
        $( "#sortable1, #sortable2" ).sortable({
          connectWith: ".connectedSortable"
        }).disableSelection();
    }

    function initializeMenu(){
        $submenus.on('click',_.bind(onLeftMenuItemClick,this))
    }

    function onLeftMenuItemClick(event){
        var menuClass = $(event.target).data('menuclass')
        $controls.find('.current').removeClass('current')
        $('.'+menuClass).addClass('current').addClass('current')
    }

    initialize();

});
