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

    $("#new-button").click(function() {
        //modal render goes in here
    });
        
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

});     // ready method end

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

function merge_user(user_id)
{


    //alert(user_id);

    //$(".fc-agenda-slots").css("background-color","yellow");
    var mergebox = "#mergebox" + user_id;

    //failsafe to check if the box is checked when the function is being called

        //adds the person merging to the merged_ids array variable in javascript
        merged_ids.push(user_id);

        //changes calendars source and adjust the events loaded with options
        var source = "/users/" + user_id + "/events";
        $('#calendar').fullCalendar('addEventSource', {
            url: source,
            className: 'merged-event ' + user_id,
            editable: false
        });

        //changes the toggle boxes color to gray and adjust text to Unmerge
        var divbox = "#" + user_id;
        $(divbox).css("backgroundColor", '#ffffcc');
        $(divbox).find("p").text('Unmerge');

        //changes function of checkbox to unmerge
        var divbox = "#mergebox" + user_id;
        var function_id = "unmerge_user(" + user_id + ")";
        $(divbox).attr("onclick", function_id);

        //rerenders calendar with AJAX
        $('#calendar').fullCalendar('rerenderEvents');

        //fades in shadows
        fadeClass=".fade-in" + user_id ; 
        //alert(fadeClass);
        $('.fade-in7').fadeIn("slow");


}

function unmerge_user(user_id)
{
    //removes the id of the person merging to merged_ids variable in javascript

    //alert(merged_ids);
    //alert(unmerge_ids);
    //alert(index);
    var index=merged_ids.indexOf(user_id);
    //alert(index);

    if (merged_ids.length>1) {
        merged_ids.splice(index, 1);
        //alert("unmerge array: " +unmerge_ids);

    }
    else {
        merged_ids = [];

    }

    //alert("merged_ids: " +merged_ids);

    //removes calendar source calendars source
    var source = "/users/" + user_id + "/events";
    $('#calendar').fullCalendar('removeEventSource', source);

    //changes the toggle boxes color to white and adjust text to Merge
    var divbox = "#" + user_id;
    $(divbox).css("backgroundColor", "white");
    $(divbox).find("p").text('Merge');

    //changes function of checkbox back to merge
    var checkbox = "#mergebox" + user_id;
    var function_id = "merge_user(" + user_id + ")";
    $(checkbox).attr("onclick", function_id);

    //rerenders calendar with AJAX
    $('#calendar').fullCalendar('rerenderEvents');

}