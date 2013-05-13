({
    paths: {
        requireLib: 'src/resources/js/vendor/require',
        jquery: 'src/resources/js/vendor/jquery',
        underscore: 'src/resources/js/vendor/underscore',
        bootstrap: 'src/resources/js/vendor/bootstrap',
        mustache : 'src/resources/js/vendor/mustache',
        text: 'src/resources/js/vendor/requirejs-plugins/text'
    },

    shim: {

        underscore: {
            exports: '_'
        },

        bootstrap: {
            deps: ['jquery']
        }
    }
})
