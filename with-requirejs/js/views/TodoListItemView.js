
define([
  'backbone',
  'jquery',
  'underscore',
  'text!templates/list-item.html'
], function(Backbone, $, _, template) {
  return Backbone.View.extend({
    template: null,
    events: {
      'click .close' : 'closeAndDestroy'  // Whenever any click event occurs on ".close", call destroy
    },
  
    /**
     * Init function to bind to events and setup the template 
     */
    initialize: function() {
      this.template = _.template( template );
      this.model.bind("change", this.render, this);
      this.model.bind("destroy", function() { this.close(true); }, this);  // Remove the view when model is destroyed
    },
  
    render: function(eventName) {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
  
    closeAndDestroy: function() {
      this.close(false);
    },
  
    close: function(alreadyDestroyed) {
      var self = this;
      $(this.el).slideUp().promise().done(function() { 
        $(this).remove(); 
        if (!alreadyDestroyed) {
          self.model.destroy();
        }
      });
    }
  });
});
