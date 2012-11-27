//= require bootstrap-min.js
//= require bootstrap-tooltip.js
//= require bootstrap-popover.js
$(document).ready(function() {

	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

    //if (window.location.toString().indexOf('users=') > -1)
    //{
        //var params = window.location.toString().substr(window.location.toString().indexOf('users=') - 1);
        //var sourceURL = '/events' + params;
    //}
    // sourceURL = '/events?users=2,3,4';


    $('#calendar').fullCalendar({
		editable: true,        
		header: {
            left: 'new_event',
            center: 'prev,title,next',
            right: 'today,month,agendaWeek,agendaDay'
        },
        defaultView: 'agendaWeek',
        height: 565,
        slotMinutes: 15,
        
        loading: function(bool){
            if (bool) 
                $('#loading').show();
            else 
                $('#loading').hide();
        },

        // a future calendar might have many sources.        
        eventSources: [

            // your event source
            {
                url: '/events',
                error: function() {
                    alert('there was an error while fetching events!');
                },
                color: 'rgba(255,153,0,.7)',   // a non-ajax option
                textColor: 'black' // a non-ajax option
            },

            // any other sources...
            {

            }
        ],


        timeFormat: 'h:mm t{ - h:mm t} ',
        dragOpacity: "0.5",
        
        //http://arshaw.com/fullcalendar/docs/event_ui/eventDrop/
        eventDrop: function(event, dayDelta, minuteDelta, allDay, revertFunc){
            updateEvent(event);
        },

        // http://arshaw.com/fullcalendar/docs/event_ui/eventResize/
        eventResize: function(event, dayDelta, minuteDelta, revertFunc){
            updateEvent(event);
        },

        // http://arshaw.com/fullcalendar/docs/mouse/eventClick/
        eventClick: function(event, jsEvent, view){
          // would like a lightbox here.
        },
	});
    // code added by bert; using the twitter bootstrap popover
    var popoptions = {
        content: "popover!",
        title: "conflicts"
    };
    $('.fc-event-bg').popover(popoptions);
});

function updateEvent(the_event) {
    $.update(
      "/events/" + the_event.id,
      { event: { title: the_event.title,
                 starts_at: "" + the_event.start,
                 ends_at: "" + the_event.end,
                 description: the_event.description
               }
      },
      function (reponse) { alert('successfully updated task.'); }
    );
};

