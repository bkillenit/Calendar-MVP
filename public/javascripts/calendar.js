$(document).ready(function() {

	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
    var h = date.getHours();


    $('#calendar').fullCalendar({
		editable: true,        
		header: {
            center: 'title'
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

        //fullcalendars eventMouseover and eventMouseout API function for returning the event, mouse coordinates, and the current view
        eventMouseover :function(event, jsEvent, view) {
            if ( ($("#event-" + event.id).hasClass("merged-event")) == true ) {
                
                // function for determing how many rows the mouse is away from the top of the div, which is the start date
                // function in jQuery extras, want to replce 15 with slot minutes variable to make it dynamic
                date = new Date(mergedHover(15, event, jsEvent));
            }
            else {
                $(this).tooltip({
                    title: 'Click event to expand',
                    placement: 'left', 
                    delay: { show: 400, hide: 50 } });
            }
        },

        eventMouseout :function(event, jsEvent, view) {
            
        },

        eventRender :function(event, element) {
            var view = $('#calendar').fullCalendar('getView');
        },           
        // a future calendar might have many sources.        
        eventSources: [

            // your event source
            {
                url: '/events',
                error: function() {
                    alert('there was an error while fetching events!');
                },
                color: '#FFCB2F',
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