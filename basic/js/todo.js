
$(function() {

  /**
   * Helper function for adding an item to the list
   * @param string text The text of the todo item
   */
  function addItem(text) {
    $("#todoList").append( getListElement(text) );
    $("#numTodos").text( $("#todoList div.alert").size() );
  }

  /**
   * Helper function that generates the HTML for a single list item
   * @param string elementText The text to be displayed
   * @return string The HTML for the list item.
   */
  function getListElement(elementText) {
    // Remove all HTML tags
    var cleanedText = elementText.replace(/<\/?[^>]+(>|$)/g, ""); 
    return "<div class='alert'>" + cleanedText + " <span class='close'>&times;</span></div>";
  };

  /**
   * Function that serves as the callback for the AJAX GET request for the XML data.
   * @param string xmlResponse The XML data provided in the AJAX HTTP response.
   */
  function handleXmlData(xmlResponse) {
    var $xml = $(xmlResponse);

    $xml.find("item").each(function() {
      addItem( $(this).find("description").text() );
    });
  };
  
  // Fire off the AJAX GET for the xml data
  $.get('items.xml', handleXmlData, 'xml');

  // Add submit handler to the form to display the todo item
  $("form").submit(function() {
    var $item = $("#newItem");
    if ($item.val() != "") {
      addItem( $item.val() );
      $item.val('');
    }
    return false;  // Prevent the browser from submitting the form
  });

  // Bind event handler for clicking the span [X] elements
  $("#todoList").on('click', 'span.close', function() {
    // Slide up the element. When it's done animating, remove it
    $(this).parent().slideUp().promise().done(function() {
      $(this).remove();
      $("#numTodos").text( $("#todoList div.alert").size() );
    });
  });
  
});
