// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$.ajaxSetup({
  beforeSend: function(xhr) {
    xhr.setRequestHeader("Accept", "text/javascript");
  }
});
var options = {
    content: "popover!",
    title: "conflicts"
};
$('.fc-event-bg').popover(options);
