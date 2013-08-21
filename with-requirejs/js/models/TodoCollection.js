
define([
  'backbone',
  'lib/backbone.localstorage.min',
  'models/TodoItem'
], function(Backbone, LocalStorage, TodoItem) {

  var TodoCollection = Backbone.Collection.extend({
    model : TodoItem,  // This collection stores TodoItem model objects
    localStorage: new Backbone.LocalStorage('todos-backbone'),

    nextId: function () {
      if (!this.length) {
        return 1;
      }
      return this.last().get('id') + 1;
    }
  });
  return new TodoCollection();
});
