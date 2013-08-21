define([
  'backbone',
  'jquery',
  'underscore',
  'text!templates/statistics.html',
  'models/TodoCollection'
], function(Backbone, $, _, template, todoCollection) {
  var StatisticsView = Backbone.View.extend({
    el : "#statistics",
    template: null,
    initialize: function() {
      this.collection = todoCollection;
      this.template = _.template( "<p>Number of items: <strong><%= numItems %></strong></p>" );
      this.collection.bind("add", this.render, this);
      this.collection.bind("remove", this.render, this);
    },
    render: function() {
      var data = { numItems: this.collection.models.length };
      $(this.el).html( this.template(data) );
    }
  });
  return new StatisticsView();
});
