//initialize global variables find way to do this with imports and exports
var merged_ids = [];

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

    $(".mege-box").attr('checked', false);

});     // ready method end

function unconfirmed_event(id) {
    event_id = "#event-" + id;
    $(event_id).tooltip('show');

}

function merge_user(user_id)
{


    //alert(merged_ids);

    //$(".fc-agenda-slots").css("background-color","yellow");
    var mergebox = "#mergebox" + user_id;

    //failsafe to check if the box is checked when the function is being called
    if ($(mergebox).is(":checked")) {

        //adds the person merging to the merged_ids array variable in javascript
        merged_ids.push(user_id);

        //changes calendars source and adjust the events loaded with options
        var source = "/users/" + user_id + "/events";
        $('#calendar').fullCalendar('addEventSource', {
            url: source,
            className: 'merged-event',
            editable: false
        });

        //changes the toggle boxes color to gray and adjust text to Unmerge
        var divbox = "#" + user_id;
        $(divbox).css("backgroundColor", '#ffffcc');
        $(divbox).find("p").text('Unmerge');

        //changes function of checkbox to unmerge
        var checkbox = "#mergebox" + user_id;
        var function_id = "unmerge_user(" + user_id + ")";
        $(checkbox).attr("onClick", function_id);

        //rerenders calendar with AJAX
        $('#calendar').fullCalendar('rerenderEvents');
    }

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
    $(checkbox).attr("onClick", function_id);

    //rerenders calendar with AJAX
    $('#calendar').fullCalendar('rerenderEvents');

}