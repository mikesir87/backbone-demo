# The app with Backbone 

Now, we move the code to use Backbone.  This allows us to create Models and Views.

## The Models

- **TodoItem** - represents a single todo item
- **TodoCollection** - a collection that stores many TodoItems

## The Views

- **TodoListView** - a view in which will be displayed all TodoItems in the TodoCollection. Registers itself for any change in the collection to allow the view to be updated.
- **TodoListItemView** - a view that will be used in the TodoListView that displays a single TodoItem. Registers itself for change events on the model and updates the view when the model is destroyed or should be closed.
- **StatisticsView** - a simple view that displays the number of items in the TodoCollection
- **AddItemFormView** - a view that handles form submission for a new item. Simply adds the new item to the TodoCollection

