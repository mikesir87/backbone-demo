define([
  'jquery',
  'models/TodoCollection',
  'models/TodoItem'
], function($, todoCollection, TodoItem) {
  var AddItemFormView = Backbone.View.extend({
    el: "#inputForm",
    events: {
      "submit" : "handleFormSubmit"
    },
    initialize: function() {
      this.$input = $(this.el).find("input[type='text']");
    },
    handleFormSubmit: function() {
      if (this.$input.val() != "") {
        var todo = new TodoItem({description: this.$input.val()});
        todoCollection.add(todo);
        this.$input.val('');
      }
      return false;
    }
  });
  return new AddItemFormView();
});
