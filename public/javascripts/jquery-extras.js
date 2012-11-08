// checks if a box is already checked when going back to the home page
// and runs merge function if necessary
$(document).ready(function() {


});

function merge_user(user_id)
    {
        var mergebox = "#mergebox" + user_id;

        //failsafe to check if the box is checked when the function is being called
        if ($(mergebox).is(":checked")) {
        //changes calendars source
        var source = "/users/" + user_id.toString() + "/events";
        $('#calendar').fullCalendar('addEventSource', {
            url: source,
            className: 'shadows',
            editable: false
        });

        //changes the toggle boxes color to gray and adjust text to Unmerge
        var divbox = "#" + user_id;
        $(divbox.toString()).css("backgroundColor", "#f2f2f2");
        $(divbox.toString()).find("p").text('Unmerge');

        //changes function of checkbox to unmerge
        var checkbox = "#mergebox" + user_id;
        var function_id = "unmerge_user(" + user_id.toString() + ")";
        $(checkbox).attr("onClick", function_id);

        //rerenders calendar with AJAX
        $('#calendar').fullCalendar('rerenderEvents');
        }

    }

    function unmerge_user(user_id)
    {

        //removes calendar source calendars source
        var source = "/users/" + user_id.toString() + "/events";
        $('#calendar').fullCalendar('removeEventSource', source);

        //changes the toggle boxes color to white and adjust text to Merge
        var divbox = "#" + user_id;
        $(divbox.toString()).css("backgroundColor", "white");
        $(divbox.toString()).find("p").text('Merge');

        //changes function of checkbox back to merge
        var checkbox = "#mergebox" + user_id;
        var function_id = "merge_user(" + user_id.toString() + ")";
        $(checkbox).attr("onClick", function_id);

        //rerenders calendar with AJAX
        $('#calendar').fullCalendar('rerenderEvents');

    }
