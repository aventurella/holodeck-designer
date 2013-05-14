define([
    'jquery'
], function($){

    var $view = $('.panel.hue-control');

    function init(){
        viewDidLoad()
    }

    function viewWillAppear(){}
    function viewWillDisappear(){}
    function viewDidLoad(){}

    init();

    return {
        '$view': $view,
        'viewWillAppear': viewWillAppear,
        'viewWillDisappear': viewWillDisappear
    };
});
