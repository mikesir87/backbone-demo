
define([
  'jquery',
  'underscore',
  'backbone',
  'views/StatisticsView',
  'views/TodoListView',
  'views/AddItemFormView',
  'models/TodoCollection',
  'models/TodoItem',
  'services/RemoteService'
], function($, _, Backbone, StatisticsView, ListView, AddForm, TodoCollection, TodoItem, RemoteService) {

  var fetchItems = function() {
    RemoteService.fetchItems(function(items) {
      for (var i = 0; i < items.length; i++) {
        TodoCollection.add(new TodoItem(items[i]));
      }
    });
  };
  
  return {
    initialize : function() {
      fetchItems();
    }
  };
  
});
