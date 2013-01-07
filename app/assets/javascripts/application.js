// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
//= require jquery
//= require jquery_ujs
//= jquery-rest
//= jquery-ui
//= require_tree .

$.ajaxSetup({
  beforeSend: function(xhr) {
    xhr.setRequestHeader("Accept", "text/javascript");
  }
});

$.ajaxSetup({ 
  'beforeSend': function(xhr) {
	 xhr.setRequestHeader("Accept", "text/javascript,application/javascript,text/html")
	} 
});

//General helper for forms submitted via ajax
$("form.remote_for").submit(function (){
    $('input[type=submit]').attr('disabled', 'disabled');
    $.post($(this).attr('action'), $(this).serialize(), null, "script");  
    return false;
});