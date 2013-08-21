
define([
  'backbone'
], function(Backbone) {
console.log(Backbone);
  return Backbone.Model.extend({
    defaults: {
      description : "",
      created : new Date(),
      completed: false
    }
  });
});
