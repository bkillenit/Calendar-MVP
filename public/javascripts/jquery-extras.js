// checks if a box is already checked when going back to the home page
// and runs merge function if necessary
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

});
function merge_user(user_id)
    {
        var mergebox = "#mergebox" + user_id;

        //failsafe to check if the box is checked when the function is being called
        if ($(mergebox).is(":checked")) {
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
