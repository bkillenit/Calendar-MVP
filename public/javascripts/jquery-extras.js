//initialize global variables find way to do this with imports and exports
var merged_ids = [];
var mousestatus;

// checks if a box is already checked when going back to the home page
// and runs merge function if necessary
//wants to move all functions to here that aren't selective upon id and  
//use the this function correctly to preload all functions
$(document).ready(function(){

    //toggles the search list between visible and not
    $("#search-btn").click(function(){
        $(".searchli").slideToggle("medium");

        //clears the search input field and parameters
        $(".search_input").val("");

    });

    //toggles the friends list between visible and not
    $("#friends-btn").click(function(){
        $(".userli").slideToggle("medium");
    });

    $(".merge-box").attr('checked', false);

    // functions for controlling the calendar form our own images from outside the fullCalendar function    
    $("#prevYear").click(function() {    
        addYears(date, -1);
        renderView();
    });

    $("#nextYear").click(function() {    
        addYears(date, 1);
        renderView();
    });    

    $("#today").click(function() {    
        date = new Date();
        renderView();
    });
});// ready method end

function drag_and_drop(time_div) {
    var d = time_div;
    
    //adjusting POST data for time zone offset, converting into UTC 
    var UTCdate = new Date();
    var n = UTCdate.getTimezoneOffset()/60;

    //converts Date into UTC for correct use by controller
    var startsAt_utc = new Date(d.getUTCFullYear(), d.getUTCMonth(), 
        d.getUTCDate(),  d.getUTCHours() - n, d.getUTCMinutes(), d.getUTCSeconds());

    var endsAt_utc = new Date(d.getUTCFullYear(), d.getUTCMonth(), 
        d.getUTCDate(),  d.getUTCHours() - n, d.getUTCMinutes() + 15, d.getUTCSeconds());

    //fills event data being pushed to controller using POST
    var events = {
        title: "New Event",
        starts_at: startsAt_utc,
        ends_at: endsAt_utc,
        all_day: 0,
        description: ""
    };

    // Ajax request sent to the events/new rails route
    $.ajax({
        type: "POST",
        url: '/events',
        data: {event: events} ,
         success: function(data) {
            $('.result').html(data);
                $('#calendar').fullCalendar('refetchEvents'); 
        } 
    });   
}

function event_tooltip(event_div) {

    if ( $(event_div).hasClass("merged-event") == true ) {
        //insert the code for popping over who is busy at that time here
        
    }
    else {
      $(event_div).tooltip({
            title: 'Click event to expand',
            placement: 'left', 
            delay: { show: 400, hide: 50 } });
    }  
}

function unconfirmed_event_mouseout(event_div) {
    //var event_id = "#event-" + id;
    //alert(mousestatus);
    //if (mousestatus=='clicked') {
        
    //}
    //else {
        //$(event_div).tooltip('hide');
        //$(event_div).popover('hide');
    //}
}