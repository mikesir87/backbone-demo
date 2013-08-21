
/**
 * A model type for a single item in the todo list.
 */
window.TodoItem = Backbone.Model.extend({
  defaults: {
    description : "",
    created : new Date(),
    completed: false,
    id: 0
  }
});

/**
 * A collection of todo items.
 */
window.TodoCollection = Backbone.Collection.extend({

  model : TodoItem,  // This collection stores TodoItem model objects

  localStorage: new Backbone.LocalStorage('todos-backbone'),

  nextId: function () {
    if (!this.length) {
      return 1;
    }
    return this.last().get('id') + 1;
  }
  
});



//////////////////////// VIEWS ////////////////////////


/**
 * The ListView is the view that encapsulates all of the todo items.  The ListView
 * contains several ListItemViews that are used to display each todo model element.
 *
 * Another way to think of this is that this holds the collection of Todo items while
 * each individual ListItemView holds a single item.
 */
window.TodoListView = Backbone.View.extend({
  el: "#todoList",
  
  /**
   * Function called automatically (like an init) that binds to the collection when 
   * various events occur
   */
  initialize: function() {
    this.collection.bind("reset", this.redraw, this);  // When the collection resets/empties
    this.collection.bind("remove", this.remove, this); // When an element is removed
    this.collection.bind("add", this.addItem, this);   // When an element is added
  },
  
  /**
   * Add a todo item to the view. Creates the new view for it and displays it.
   * @param TodoItem item The item to be added
   */
  addItem: function(item) {
    var view = this.createItemView(item);
    $(this.el).append(view.render().el);
  },
  
  /**
   * Removes a todo item from the list.
   * @param TodoItem item The TodoItem to be removed
   */
  remove: function(item) {
    item.destroy();
  },
  
  /**
   * Redraw the list from scratch.
   */
  redraw: function(eventName) {
    var $el = $(this.el).clone();
    $el.html('');
    _.each(this.items, function(item) {
      $el.append(item.render().el);
    }, this);
    $(this.el).html($el);
    return this;
  },
  
  /**
   * Helper method to created and manage a new ListItemView
   * @param TodoItem item The new TodoItem
   * @return A TodoListItemView for the TodoItem
   */
  createItemView: function(item) {
    var view = new TodoListItemView({model: item});
    return view;
  }
  
});


/**
 * A view that is used to display a single Todo item within the list of todo items
 */
window.TodoListItemView = Backbone.View.extend({
  template: null,
  events: {
    'click .close' : 'closeAndDestroy'  // Whenever any click event occurs on ".close", call destroy
  },
  
  /**
   * Init function to bind to events and setup the template 
   */
  initialize: function() {
    this.template = _.template( $("#tmpl-todo-list-item").html() );
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

/**
 * A view that displays statistics - currently the number of items
 */
window.StatisticsView = Backbone.View.extend({
  el : "#statistics",
  template: null,
  initialize: function() {
    this.template = _.template( "<p>Number of items: <strong><%= numItems %></strong></p>" );
    this.collection.bind("add", this.render, this);
    this.collection.bind("remove", this.render, this);
  },
  render: function() {
    var data = { numItems: this.collection.models.length };
    $(this.el).html( this.template(data) );
  }
});


/**
 * A view that allows a new item to be created
 */
window.AddItemFormView = Backbone.View.extend({
  el: "#inputForm",
  events: {
    "submit" : "handleFormSubmit"  // When a submit is fired, call handleFormSubmit
  },
  initialize: function() {
    this.$input = $(this.el).find("input[type='text']");
  },
  handleFormSubmit: function() {
    if (this.$input.val() != "") {
      var todo = new TodoItem({description: this.$input.val()});
      this.collection.add(todo);
      this.$input.val('');
    }
    return false;
  }
});


//////////////////////// REMOTE SERVICE /////////////////////////////

/**
 * A service to be used with communication to the a remote service
 */
function RemoteService() {

  function handleXmlResponse(xmlResponse, callback) {
    var items = Array();

    $(xmlResponse).find("item").each(function() {
      items.push({
        id :          parseInt( $(this).attr("id") ),
        description:  $(this).find("description").text()
      });
    });
    
    callback(items);
  };

  this.fetchItems = function(callback) {
    $.get("items.xml", function(data) { handleXmlResponse(data, callback) }, 'xml');
  };
  
};


//////////////////////// SETUP ////////////////////////

var todoCollection = new TodoCollection();
var todoView = new TodoListView({collection: todoCollection});
var statistics = new StatisticsView({collection: todoCollection});
var remoteService = new RemoteService();
var inputFormView = new AddItemFormView({collection: todoCollection});

$(function() {
  
  remoteService.fetchItems(function(items) {
    for (var i = 0; i < items.length; i++) {
      todoCollection.add(new TodoItem(items[i]));
    }
  });
  
});