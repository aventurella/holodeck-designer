define([
    'jquery',
    'mustache'
], function($, Mustache){

    sceneTemplate = Mustache.compile($('#scene-template').html());


    /* {
            title: Untitled Scene,
            lights: SceneLight[]
        }
    */

    function SceneItem(model) {
        this.$view = $(sceneTemplate(model));
        this.$title = this.$view.find('label');
        this.model = model;
    }

    // SceneLight
    SceneItem.prototype.addLight = function(light){
        this.model.lights.push(light);
    };

    SceneItem.prototype.clearLights = function(){
        this.model.lights = [];
    };

    SceneItem.prototype.setName = function(value){
        this.model.title = value;
        this.$title.text(value);
    };

    return SceneItem;
});
