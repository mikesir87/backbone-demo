# Introducing RequireJS 

In this section, we introduce RequireJS, which allows for modular development and inclusion of Javascript files.

Basically, a module (one per file) can define its own dependencies and then define its own module definition.

RequireJS uses [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD).  After reading a little about AMD, it should make a little sense.

## File Structure

<pre>
js/
  app.js
  main.js
  modules/
    TodoCollection.js
    TodoItem.js
  services/
    RemoteService.js
  templates/
    list-item.html
    statistics.html
  views/
    AddItemFormView.js
    StatisticsView.js
    TodoListItemView.js
    TodoListView.js
</pre>
