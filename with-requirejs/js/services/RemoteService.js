define([
  'jquery'
], function($) {
  return new (function() {
    
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
    
  })();
});
