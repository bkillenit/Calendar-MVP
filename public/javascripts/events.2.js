jQuery(document).ready(function() {
	//alert('events');
	var calpage = $('table#times')
	if (calpage.length > 0 ){
		//alert("calendar!");
	
	// add table rows in main calendar
	var row = "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"
	function buildRows() {
		for(var g=0; g<24; g++) {
		jQuery(".days table").append(row);
		}
	}
	buildRows();
	
	// "times" table: the side column that holds 12:00am, 1:00am, etc.
	var timeCount = 0;
	var timeRow;
	var ampm = "am";
	var timeHours = 12;
	
	for (timeCount = 0; timeCount <24; timeCount++) {
		if (timeCount == 12) {
			ampm = "pm";
			timeHours = 12;
		}		

		timeRow = "<tr><td><div class='time-padding'>" + timeHours + ":00" + ampm + "</div></td></tr>";
		jQuery("#times").append(timeRow);
		
		if (timeHours == 12) {
			timeHours = 0;
		}
		
		timeHours++;
	}
	
	//stylize odd rows with blue shade
	//jQuery("#times tr:odd").find("td").css("background-color", "#f5fcff");
	//jQuery("#cal-days table tr:odd").find("td").css("background-color", "#f5fcff");
	
	/* --------------- EVENTS ARRAY ------------- */
	
	
	

	
	
	var eventArray = new Array();
	// Create Rails loop that makes eventArray "push" items
	//eventArray.push({eventTitle: "Practice", eventDescription: "Description goes here", eventStartTimeYear: 2012, eventStartTimeMonth: 6, eventStartTimeDay: 17, eventStartTimeHour: 12, eventStartTimeMinutes: 30, eventEndTimeYear: 2012, eventEndTimeMonth: 7, eventEndTimeDay: 17, eventEndTimeHour: 15, eventEndTimeMinutes: 30});
	
	//eventArray.push({eventTitle: "Practice 2", eventDescription: "Description goes here", eventStartTimeYear: 2012, eventStartTimeMonth: 6, eventStartTimeDay: 19, eventStartTimeHour: 13, eventStartTimeMinutes: 30, eventEndTimeYear: 2012, eventEndTimeMonth: 7, eventEndTimeDay: 19, eventEndTimeHour: 15, eventEndTimeMinutes: 30});
	
	//eventArray.push({eventTitle: "Practice 3", eventDescription: "Description goes here", eventStartTimeYear: 2012, eventStartTimeMonth: 6, eventStartTimeDay: 20, eventStartTimeHour: 9, eventStartTimeMinutes: 30, eventEndTimeYear: 2012, eventEndTimeMonth: 7, eventEndTimeDay: 20, eventEndTimeHour: 13, eventEndTimeMinutes: 30});
	
   
   //alert(eventArray.length);
   
         $.ajax({
             type: "GET",
             //url: 'http://serverurl/events/getmeetings.json',
	     //rl: 'http://checkitit.herokuapp.com/events/getmeetings.json',
	     url: 'http://localhost:3000/events/getmeetings.json',
             dataType: "json",
               success: function(data){
		//alert("ajaxed!");
                var items = []
                     $.each(data, function(key, val) {
                     items.push(val);
		     var start_year = val.start.substr(0,4);
		     var start_month = val.start.substr(5,2);
		     var start_day = val.start.substr(8,2);
		     var start_timehour = val.start.substr(11,2);
		     var start_timemins = val.start.substr(14,2);
		     var end_timehour = val.end.substr(11,2);
		     var end_timemins = val.end.substr(14,2);
		     eventArray.push({eventTitle:  val.name,
				     eventDescription: val.start,
				     eventStartTimeYear: start_year,
				     eventStartTimeMonth: start_month,
				     eventStartTimeDay: start_day,
				     eventStartTimeHour: parseInt(start_timehour),
				     eventStartTimeMinutes: parseInt(start_timemins),
				     eventEndTimeYear: start_year,
				     eventEndTimeMonth: start_month,
				     eventEndTimeDay: start_day,
				     eventEndTimeHour: parseInt(end_timehour),
				     eventEndTimeMinutes: (end_timemins)});
		     //alert("event pushed!");
                    });//each data push end
		//alert(items[0].name);
	/* --------------- BUILD BOXES AND LOOP THROUGH EVENT ARRAY ------------- */
	var eventArrayTotalItems = eventArray.length;
	var box;
	for (var e = 0; e < eventArrayTotalItems; e++) {
		box = "<div class='box' style='position:absolute'><div class='box-padding'><div class='box-content'><p><span class='eventStartTime'>" + eventArray[e].eventStartTimeHour + ":" + eventArray[e].eventStartTimeMinutes + "</span>-<span class='eventEndTime'>" + eventArray[e].eventEndTimeHour + ":" + eventArray[e].eventEndTimeMinutes + "</span></p><h3>" + eventArray[e].eventTitle + "</h3><h3>" + eventArray[e].eventStartTimeMonth + " " + eventArray[e].eventStartTimeDay + "," + eventArray[e].eventStartTimeYear + "</h3></div></div></div>";
		jQuery(".days table").append(box);
		//alert("boxes");
	}
	
	var initStartTime, initStartMinutes, initEndTime, initEndMinutes, initPosY, initPosX, initEndTime, initDay, initDayNum;
	var f = 0;
	var utcString;
	jQuery(".box").each(function() {
		initStartMinutes = eventArray[f].eventStartTimeMinutes/60;
		initStartTime = eventArray[f].eventStartTimeHour + initStartMinutes;
		
		initEndMinutes = eventArray[f].eventEndTimeMinutes/60;
		initEndTime = eventArray[f].eventEndTimeHour + initEndMinutes;
		
		utcString = new Date(Date.UTC(eventArray[f].eventStartTimeYear,  eventArray[f].eventStartTimeMonth, eventArray[f].eventStartTimeDay,  eventArray[f].eventStartTimeHour, eventArray[f].eventStartTimeMinutes));
		//alert(utcString);
		
		
		// search utcString for day abbreviations
		// returns true or false
		var forSunday=/Sun/g;
		var testSunday = forSunday.test(utcString);
		var forMonday=/Mon/g;
		var testMonday = forMonday.test(utcString);
		var forTuesday=/Tue/g;
		var testTuesday = forTuesday.test(utcString);
		var forWednesday=/Wed/g;
		var testWednesday = forWednesday.test(utcString);
		var forThursday=/Thu/g;
		var testThursday = forThursday.test(utcString);
		var forFriday=/Fri/g;
		var testFriday = forFriday.test(utcString);
		var forSaturday=/Sat/g;
		var testSaturday = forSaturday.test(utcString);
		
		if (testSunday == true) {
	 		//alert("Sunday!");
	 		initDayNum = 0;
		} else if (testMonday == true)  {
			//alert("Monday");
			initDayNum = 1;
		} else if (testTuesday == true)  {
			//alert("Tuesday");
			initDayNum = 2;
		} else if (testWednesday == true)  {
			//alert("Wednesday");
			initDayNum = 3;
		} else if (testThursday == true)  {
			//alert("Thursday");
			initDayNum = 4;
		} else if (testFriday == true)  {
			//alert("Friday");
			initDayNum = 5;
		} else if (testSaturday == true)  {
			//alert("Saturday");
			initDayNum = 6;
		} else {
			//alert("nothing");
		}
		
		if (testSunday == true) {
			initPosX = 0;
		} else {
			initPosX = initDayNum * 120;
		}
		
		initPosY = initStartTime * 50;
		initEndTime = initEndTime * 50;
		
		jQuery(this).css("height", initEndTime - initPosY);
		
		
		
		initDay = eventArray[f].eventStartDay;
		
		if (initDay == "Monday") {
			initDayNum = 1;
		} else if (initDay == "Tuesday") {
			initDayNum = 2;
		} else if (initDay == "Wednesday") {
			initDayNum = 3;
		} else if (initDay == "Thursday") {
			initDayNum = 4;
		} else if (initDay == "Friday") {
			initDayNum = 5;
		} else if (initDay == "Saturday") {
			initDayNum = 6;
		}
		
		//alert(initDayNum);
		
		if (initDay == "Sunday") {
			initPosX = 0;
		} else {
		 	initPosX = initDayNum * 120;
		}
		
		jQuery(this).animate({
			"left": initPosX,
			"top": initPosY,
			"opacity": 1
		}, "fast");
		f++;
	}); // each method end
	
	/* --------------- BOX CONTROLS ------------- */
	
	var boxOffset; var boxTop; var boxLeft; var boxEndHeight;
	var numX1; var numX2; var numY1; var numY2;
	var days = jQuery(".days");
	var daysPos = days.offset();
	var daysPosLeft = daysPos.left;
	var daysPosTop = daysPos.top;
	
	// enable drag-drop and resize
	jQuery(".box").draggable({
		containment: "parent"
	}).resizable({handles: 's'});
	
	jQuery(".box").bind("drag", function() {
		//jQuery(this).css("background-color", "pink");
			boxOffset = jQuery(this).offset();
			boxTop = boxOffset.top;
			
			var daysCropOffset = jQuery(".days-crop").offset();
			var daysCropTop = daysCropOffset.top;
			
			var boxDifference = boxTop - daysCropTop;
			
			//alert(slideBoxTop);
			var slideBoxTopOffSet = jQuery(".slide-box").offset();
			var slideBoxTopOffSetTop = slideBoxTopOffSet.top;
			
			if (boxDifference <= 25 ) {
				
				jQuery(".days").css("margin-top", "+=5px");
				jQuery("#times").css("margin-top", "+=5px"); 
				if (slideBoxTopOffSetTop <= 160) {
					alert("whoa!");
					jQuery(".slide-box").css("top", "0px");
				} else {
					jQuery(".slide-box").css("top", "-=1px");
				}
			}
	});
	
	jQuery(".box").bind("dragstop", function(event, ui) {
		//event.preventDefault();
  		boxOffset = jQuery(this).offset();
		boxTop = boxOffset.top;
		boxLeft = boxOffset.left;
		boxEndHeight = jQuery(this).height();
  		// X values
		numX1 = boxLeft - daysPosLeft;
		numX2 = Math.round(numX1 / 120) * 120;
		
		// Y values
		numY1 = boxTop - daysPosTop;
		numY2 = Math.round(numY1 / 25) * 25;
	
		jQuery(this).animate({
			"left": numX2,
			"top": numY2
		}, "fast");
		//updateEvent();
	});
	
	
	
	function moveBox() {		
		// X values
		numX1 = boxLeft - daysPosLeft;
		numX2 = Math.round(numX1 / 120) * 120;
		
		// Y values
		numY1 = boxTop - daysPosTop;
		numY2 = Math.round(numY1 / 25) * 25;
		numY2 = boxEndHeight;
	
		jQuery(this).animate({
			"left": numX2,
			"top": numY2
		}, "fast");
		//updateEvent();
	}
	
	var currentBoxHeight;
	var newBoxHeight;
	var boxTime;
	var newBoxHeightBorder;
    //var theBoxHeight = jQuery(".box").height();
 	jQuery(".box").bind("resizestop", function(event, ui) {
 		//alert("stop");
 		currentBoxHeight = jQuery(this).height();
 		//theBoxHeight = currentBoxHeight;
 		
 		//updateText();
 		newBoxHeight = Math.round(currentBoxHeight / 25) * 25;
		
		// determine extra height for borders
		//newBoxHeightBorder = Math.round(newBoxHeight/50);
		//theBoxHeight = newBoxHeight;
		
		jQuery(this).animate({
				"height": newBoxHeight,
				"width": "110px"
		});
			
		//boxTime = Math.round(newBoxHeight/25)*.5;
		//updateText();
		//alert(theBoxHeight);
		// updateEvent();
	
	});
	
	
	jQuery(".days table").find("tr:odd").find("td").css("background-color", "#c1edff");
	jQuery("#times").find("tr:odd").find("td").css("background-color", "#c1edff");
	
	var col;
	var row;
	jQuery(".days table td").hover(function() {
 		//jQuery(this).css("background-color", "pink");
 		col = jQuery(this).parent().children().index(jQuery(this));
  		row = jQuery(this).parent().parent().children().index(jQuery(this).parent());
 		//alert('Row: ' + row + ', Column: ' + col);
 		jQuery(this).parents("table").find("tr").find("td:eq(" + col + ")").css("background-color", "#d8d8d8");
 	}, function() {
 		jQuery(this).parents("table").find("tr").find("td:eq(" + col + ")").css("background-color", "white");
 		jQuery(".days table").find("tr:odd").find("td").css("background-color", "#c1edff");
 	});
                 }// success end
             }); //ajax end
	 
	 
	//alert("event push"); 
	// count items in array to limit the loop below	
	
	//alert(eventArrayTotalItems);
	

	
	
	}//check if calendar page is loaded
}); // ready method end