require.config({
  paths: {
    jquery : "lib/jquery.min",
    underscore: "lib/underscore.min",
    backbone: "lib/backbone.min",
    text: "lib/requirejs.text",
  },
  shim: {
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    underscore: {
      exports: "_"
    }
  }
});

require([
  'app'
], function(App) {
  App.initialize();
});
