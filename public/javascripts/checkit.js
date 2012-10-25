jQuery(document).ready(function() {

	//  calculate window width and height
    var windowH = jQuery(window).height();
    var windowW = jQuery(window).width();
    
    /*------------ CREATE NEW EVENT ----------- */
    // establish size of the shadow box
    // shadow box goes underneath the create new event box
    jQuery("#shadow").css("height", windowH);
    jQuery("#shadow").css("width", windowW);
    
    // vertically center the create new event box
    var createEventHeight = jQuery("#createEvent").height();
    var createEventMarginTop = (windowH - createEventHeight)/2;
    jQuery("#createEvent").css("margin-top", createEventMarginTop);
    
    jQuery("#createEventClose").click(function() {
    	jQuery(this).parents("#createEvent").hide();
    	jQuery(this).parents("#shadow").hide();
    });
    /*---------------- CREATE NEW EVENT END ------------- */



	/*------------- BUILD CALENDAR ------------- */
	
	// .days : the box that will be filled with the grid
	// first detect the offset position of the days box
	var calCropOffset = jQuery(".days").offset();
	calOffSetTop = calCropOffset.top;
	calOffSetLeft = calCropOffset.left;

	// array holding month names
	// for example: monthNameList[2] would be March
	var monthNameList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
	// January has 31 days, February has 28, etc.
	var monthDayTotals = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
	
	// Leap year, adjust February total
	var monthDayTotalsLeap = ["31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];

	// array holding day names
	// example: dayNames[4] would be Thursday
	var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	
	// blank array that will hold week information
	
	var weekList = new Array();
	
	// current year to start the build with
	var theYear = 2012;
	
	// set up counters for the loops
	var theWeek = 1;
	var leapYearCount = 1;
	var week52total = 1;
	var currentMonth = 0;
	var day7 = 1;
	var day365 = 1;
	var total365 = 1;
	var dayTotal = 366;
	
	// 2012 is a leap year
	var leapYear = true;
	var yearDayTotal;
	
	var weekday1, weekday2, weekday3, weekday4, weekday5, weekday6, weekday7;

	var useLeapArray;
	var theArray;
	
	for (var loopFuel = 1; loopFuel < 100; loopFuel++) {
		if (leapYearCount == 1) {
			// leap year
			leapYear = true;
			useLeapArray = true;
			dayTotal = 367; 
			theArray = monthDayTotalsLeap;
			//leap();
			leapYearCount++;
		} else if (leapYearCount == 4) {
			leapYearCount = 1;
			leapYear = false;
			useLeapArray = false;
			dayTotal = 366; 
			theArray = monthDayTotals;
			//leap();
		} else {
			//not leap year
			leapYear = false;
			useLeapArray = false;
			dayTotal = 366; 
			theArray = monthDayTotals;
			//leap();
			leapYearCount++;
		}
		
		for (var i=0; i<dayTotal; i++) {
				if (day7 == 1) {
					weekday1 = "<span class='theMonth'>" + monthNameList[currentMonth] + "</span> <span class='theDay'>" + day365 + "</span>";
				} else if (day7 == 2) {
					weekday2 = "<span class='theMonth'>" + monthNameList[currentMonth] + "</span> <span class='theDay'>" + day365 + "</span>";
				} else if (day7 == 3) {
					weekday3 = "<span class='theMonth'>" + monthNameList[currentMonth] + "</span> <span class='theDay'>" + day365 + "</span>";
				} else if (day7 == 4) {
					weekday4 = "<span class='theMonth'>" + monthNameList[currentMonth] + "</span> <span class='theDay'>" + day365 + "</span>";
				} else if (day7 == 5) {
					weekday5 = "<span class='theMonth'>" + monthNameList[currentMonth] + "</span> <span class='theDay'>" + day365 + "</span>";
				} else if (day7 == 6) {
					weekday6 = "<span class='theMonth'>" + monthNameList[currentMonth] + "</span> <span class='theDay'>" + day365 + "</span>";
				} else if (day7 == 7) {
					weekday7 = "<span class='theMonth'>" + monthNameList[currentMonth] + "</span> <span class='theDay'>" + day365 + "</span>";
				}
				
				if (day365 == theArray[currentMonth] ) {
					day365 = 1;
					if (currentMonth == 11) {
						currentMonth = 0;
						theYear++;
					} else {
						currentMonth++;
					}
				} else {
					day365++;
				}
				
				if(day7 == 7) {
					day7 = 1;
					weekList.push({
					weekYear: theYear, 
					weekSunday: weekday1, 
					weekMonday: weekday2, 
					weekTuesday: weekday3, 
					weekWednesday: weekday4, 
					weekThursday: weekday5, 
					weekFriday: weekday6,  
					weekSaturday: weekday7
					});
				} else {
					day7++;
				}

			} // for end
	} //for loopfuel
	
	var current = new Date();  
 	var month = current.getMonth();  
 	var day = current.getDate();  
 	var year = current.getFullYear();
 	//var thisDay = current.getDay();
 	var dateString = "<span class='theMonth'>" + monthNameList[month] + "</span> <span class='theDay'>" + day + "</span>";
 	//alert(dateString);
 	
 	
 	// the purpose of this loop is to take the current date string and compare it against the weekList, which holds all of the days of the year
 	// if todays date matches one of the 
 	for (var c = 0; c < 100; c++) {
 		if (dateString == weekList[c].weekSunday) {
 			//alert("Sunday Match");
 			fillTableHead();
 			break;
 		} else if (dateString == weekList[c].weekMonday) {
 			//alert("Monday Match");
 			fillTableHead();
 			break;
 		} else if (dateString == weekList[c].weekTuesday) {
 			//alert("Tuesday Match");
 			fillTableHead();
 			break;
 		} else if (dateString == weekList[c].weekWednesday) {
 			//alert("Wednesday Match");
 			fillTableHead();
 			break;
 		} else if (dateString == weekList[c].weekThursday) {
 			//alert("Thursday Match");
 			fillTableHead();
 			break;
 		} else if (dateString == weekList[c].weekFriday) {
 			//alert("Friday Match");
 			fillTableHead();
 			break;
 		} else if (dateString == weekList[c].weekSaturday) {
 			//alert("Saturday Match");
 			fillTableHead();
 			break;
 		}
 	}
 	
 	function fillTableHead() {
 		jQuery("#days-header thead tr").append("<th>" + weekList[c].weekSunday + "</th><th>" + weekList[c].weekMonday + "</th><th>" + weekList[c].weekTuesday + "</th><th>" + weekList[c].weekWednesday + "</th><th>" + weekList[c].weekThursday + "</th><th>" + weekList[c].weekFriday + "</th><th>" + weekList[c].weekSaturday + "</th>");
 		
 		var theTableHead = "<p>" + weekList[c].weekSunday + "-" + weekList[c].weekSaturday + "</p>";
 		
 		jQuery("#main-header-center").append(theTableHead);
 		
 		//jQuery(".weekBeginMonth").text(weekList[c].weekSunday);
 		//jQuery(".weekEndMonth").text(weekList[c].weekSaturday);
 		jQuery('#days-header thead tr th').each(function() {
       	 	//jQuery(this).text(jQuery(this).text().replace(', 2012', ''));
       	 	//jQuery(this).text(jQuery(this).text().replace(", " + weekList[c].weekYear + "", ""));
    	});
 	}
 	
 	jQuery("#previousWeek").click(function(event) {
 		event.preventDefault();
 		//alert("clicked!");
 		c--;
 		clearTableHead();
 	});
 	
 	jQuery("#nextWeek").click(function(event) {
 		event.preventDefault();
 		//alert("clicked!");
 		c++;
 		clearTableHead();
 	});
 	
 	function clearTableHead() {
 		jQuery("#days-header thead tr").empty();
 		fillTableHead();
 		//stripYear();
 	}
 	
 	function stripYear() {
 		
    }
    
    stripYear();
    
    
    
    var clickCheck = false;
    jQuery(".friends-btn").click(function() {
    	
    	if (clickCheck == false) {
    		clickCheck = true;
    		jQuery(this).parents(".friends h2").find("span.arrow").css("background-position", "-64px -16px");
    	} else {
    		clickCheck = false;
    		jQuery(this).parents(".friends h2").find("span.arrow").css("background-position", "-32px -16px");
    	}
    	jQuery(this).parents(".friends").find(".friends-list").slideToggle();
    });
    

	var mainHeight = jQuery("#main").height();
	var sidebarHeight = jQuery("#sidebar-left").height();
	
	function setHeight() {
		//alert(mainHeight);
		if (mainHeight > sidebarHeight) {
			jQuery("#sidebar-left").css("height", mainHeight);
		}
	}
 
 	setHeight();
 
 	jQuery(".slide-box").draggable({
		containment: "parent"
	});
	
	jQuery(".slide-box").bind("drag", function() {
		//jQuery(this).css("background-color", "pink");
		var barOffset = jQuery(".scroll-padding").offset();
		//alert(barOffset.top);
		var barTop = barOffset.top;
		var slideOffset = jQuery(this).offset();
		var slideTop = slideOffset.top;
		jQuery(".slide-box").css("top", slideTop-barTop);
		
		var slideDifference = slideTop - barTop;
		var slidePercent = (slideDifference * 100) / 450;

		var calPercent = ((1125 * slidePercent) / 100) * -1;
		jQuery(".days").css("margin-top", calPercent);
		jQuery("#times").css("margin-top", calPercent);  
		//jQuery(".percent").text(slidePercent);
	});
	
	
	// initial position, moves everything to 8am
	function setSlide() {
		// begin at 8:00am
 		jQuery(".days").css("margin-top", "-400px");
 		jQuery("#times").css("margin-top", "-400px");
 		var slidePosition = (32*500)/100;
 		jQuery(".slide-box").css("top", slidePosition);
		
	}
 	setSlide();
 	
 	
 	// CLICK THE CALENDAR
 	// mousedown and mouseup
 	
 	var flag = false;
	jQuery(".days table").mousedown(function(event){
   		flag = true;
   		var target = jQuery(event.target);
   		
   		if (target.hasClass("box")) {
   			// if you clicked on an existing box, don't do anything
   			jQuery(".boxStatus").text("mouse clicked on a box");
   			//alert("yes");
   			flag = false;
   		} else {
   			// if you DIDN'T click on an existing box, create new event
   			jQuery(".boxStatus").text("not on a box");
   			
   		} // end of click conditional
  
   		// trace the event
   		jQuery(".mouseStatus").text("mousedown");
   		
   		
   		//jQuery(".mouseStatus").text("mousedown");
	});
	
	
	
	jQuery(".days table").on("mouseup", function(event){
		var target = jQuery(event.target);
		if (flag == true) {
			jQuery(".mouseStatus").text("mouseup");
    		showCreateEventForm();
    	} else {
			flag = false;
		
		/*jQuery(target).unbind("mousemove.newevent");*/
        //alert("new event");
    	jQuery(".mouseStatus").text("mouseup");
    	/*jQuery(".days table").unbind("mousemove");*/
    	}
	});
	
	jQuery("#createEventBtn").click(function() {
		showCreateEventForm();
	});
	
	function showCreateEventForm() {
		jQuery("#shadow").show();
    	jQuery("#createEvent").fadeIn();
	}
	
	
	/* ---------------- ADD TIMES TO TIMES COLUMN ------------ */
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
	/*-------------- TIMES COLUMN END ------------ */
	
	/* --------------- EVENTS ARRAY ------------- */
	
	var eventArray = new Array();
	
	
	// Create Rails loop that makes eventArray "push" items
	/*
	eventArray.push({eventTitle: "Practice", eventDescription: "Description goes here", eventStartTimeYear: 2012, eventStartTimeMonth: 6, eventStartTimeDay: 17, eventStartTimeHour: 12, eventStartTimeMinutes: 30, eventEndTimeYear: 2012, eventEndTimeMonth: 7, eventEndTimeDay: 17, eventEndTimeHour: 15, eventEndTimeMinutes: 30});

	eventArray.push({eventTitle: "Practice 2", eventDescription: "Description goes here", eventStartTimeYear: 2012, eventStartTimeMonth: 6, eventStartTimeDay: 19, eventStartTimeHour: 13, eventStartTimeMinutes: 30, eventEndTimeYear: 2012, eventEndTimeMonth: 7, eventEndTimeDay: 19, eventEndTimeHour: 15, eventEndTimeMinutes: 30});
	
	eventArray.push({eventTitle: "Practice 3", eventDescription: "Description goes here", eventStartTimeYear: 2012, eventStartTimeMonth: 6, eventStartTimeDay: 20, eventStartTimeHour: 9, eventStartTimeMinutes: 30, eventEndTimeYear: 2012, eventEndTimeMonth: 7, eventEndTimeDay: 20, eventEndTimeHour: 13, eventEndTimeMinutes: 30});

    */

    // Create Rails loop that makes eventArray "push" items
    eventArray.push({eventTitle: "Class", eventDescription: "Description goes here", eventStartTimeYear: 2012, eventStartTimeMonth: 1, eventStartTimeDay: 17, eventStartTimeHour: 12, eventStartTimeMinutes: 30, eventEndTimeYear: 2012, eventEndTimeMonth: 3, eventEndTimeDay: 17, eventEndTimeHour: 15, eventEndTimeMinutes: 30});

    eventArray.push({eventTitle: "Practice 2", eventDescription: "Description goes here", eventStartTimeYear: 2012, eventStartTimeMonth: 1, eventStartTimeDay: 19, eventStartTimeHour: 13, eventStartTimeMinutes: 30, eventEndTimeYear: 2012, eventEndTimeMonth: 3, eventEndTimeDay: 19, eventEndTimeHour: 15, eventEndTimeMinutes: 30});

    eventArray.push({eventTitle: "Practice 3", eventDescription: "Description goes here", eventStartTimeYear: 2012, eventStartTimeMonth: 1, eventStartTimeDay: 20, eventStartTimeHour: 9, eventStartTimeMinutes: 30, eventEndTimeYear: 2012, eventEndTimeMonth: 3, eventEndTimeDay: 20, eventEndTimeHour: 13, eventEndTimeMinutes: 30});




    // count items in array to limit the loop below
	var eventArrayTotalItems = eventArray.length;
	
	/* --------------- BUILD BOXES AND LOOP THROUGH EVENT ARRAY ------------- */
	
	var box;
	for (var e = 0; e < eventArrayTotalItems; e++) {
		box = "<div class='box'><div class='box-padding'><div class='box-content'><p><span class='eventNum'>" + e + "</span><span class='eventStartTime'>" + eventArray[e].eventStartTimeHour + ":" + eventArray[e].eventStartTimeMinutes + "</span>-<span class='eventEndTime'>" + eventArray[e].eventEndTimeHour + ":" + eventArray[e].eventEndTimeMinutes + "</span></p><h3>" + eventArray[e].eventTitle + "</h3><h3><span class='eventStartTimeMonth'>Start Month:" + eventArray[e].eventStartTimeMonth + "</span><span class='eventStartTimeDay'>Start Day:" + eventArray[e].eventStartTimeDay + "</span>,<span class='eventStartTimeYear'>" + eventArray[e].eventStartTimeYear + "</span></h3></div></div></div>";
		jQuery(".days table").append(box);
		//console.log(box);
		//alert("wa");
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
	 		// alert("Sunday!");
	 		initDayNum = 0;
		} else if (testMonday == true)  {
			// alert("Monday");
			initDayNum = 1;
		} else if (testTuesday == true)  {
			// alert("Tuesday");
			initDayNum = 2;
		} else if (testWednesday == true)  {
			// alert("Wednesday");
			initDayNum = 3;
		} else if (testThursday == true)  {
			// alert("Thursday");
			initDayNum = 4;
		} else if (testFriday == true)  {
			// alert("Friday");
			initDayNum = 5;
		} else if (testSaturday == true)  {
			// alert("Saturday");
			initDayNum = 6;
		} else {
			alert("nothing");
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
	var numX1 = 0; var numX2 = 0; var numY1 = 0; var numY2 = 0;
	var days = jQuery(".days");
	var daysPos = days.offset();
	var daysPosLeft = daysPos.left;
	var daysPosTop = daysPos.top;
	
	// enable drag-drop and resize
	jQuery(".box").draggable({
		containment: "parent"
	}).resizable({handles: 's'});
	
	var marginTopValue = -400;
	var marginTop;
	
	jQuery(".box").bind("drag", function() {
		// grab index number of this box to use later
		var currentBoxNum = jQuery(this).find(".eventNum").text();
		
		// grab current xy position coordinates of days box
		daysPos = days.offset();
		daysPosLeft = daysPos.left;
		daysPosTop = daysPos.top;
		
		// grab current xy position coordinates of THIS box
		boxOffset = jQuery(this).offset();
		boxTop = boxOffset.top;
			
			// grab current xy position coordinates of smaller box that is cropping the bigger .days box
			var daysCropOffset = jQuery(".days-crop").offset();
			var daysCropTop = daysCropOffset.top;
			
			var boxDifference = boxTop - daysCropTop;
			
			//alert(slideBoxTop);
			var slideBoxTopOffSet = jQuery(".slide-box").offset();
			var slideBoxTopOffSetTop = slideBoxTopOffSet.top;
			
			//var marginTop = jQuery(".days").css("margin-top");
			
			//alert(marginTop);
			
			if (boxDifference <= 25 ) {
				marginTopValue += 5;
				marginTop = marginTopValue + "px";
				
				jQuery(".days").css("margin-top", marginTop);
				jQuery("#times").css("margin-top", marginTop); 
				if (slideBoxTopOffSetTop <= 160) {
					alert("whoa!");
					jQuery(".slide-box").css("top", "0px");
				} else {
					jQuery(".slide-box").css("top", "-=1px");
				}
			} else if (boxDifference >= 350) {
				//alert("bottom");
				marginTopValue -= 5;
				marginTop = marginTopValue + "px";
				
				jQuery(".days").css("margin-top", marginTop);
				jQuery("#times").css("margin-top", marginTop); 
				if (slideBoxTopOffSetTop <= 160) {
					alert("whoa!");
					jQuery(".slide-box").css("top", "0px");
				} else {
					jQuery(".slide-box").css("top", "-=1px");
				}
			}	
	});
	
	jQuery(".box").bind("dragstop", function(event, ui) {
		numY2 = 0;
		
		// grab offset positions of the current box
  		boxOffset = jQuery(this).offset();
		boxTop = boxOffset.top;
		boxLeft = boxOffset.left;
		
		// grab the height of the current box
		boxEndHeight = jQuery(this).height();
		var newEndTime = boxEndHeight / 50;
		//alert(newEndTime);
		
		// calculate accurate x and y values, and round them
  		// X values
		numX1 = boxLeft - daysPosLeft;
		numX2 = Math.round(numX1 / 120) * 120;
		
		// Y values
		//numY1 = boxTop - daysPosTop;
		numY1 = boxTop - daysPosTop; // - marginTopValue);
		numY2 = Math.round(numY1 / 25) * 25;
		
		// animate to new x y coordinates
		jQuery(this).animate({
			"left": numX2,
			"top": numY2
		}, "fast");
		
	
		// calculate which interval of 120 the box position is
		var columnNumber120 = Math.round((boxLeft - daysPosLeft) / 120) * 120;
		var columnNumber = columnNumber120 / 120;
		
		var newStartTimeHourActual = numY2 / 50;
		var newStartTimeHour = Math.floor(numY2 / 50);
		
		// if the hour is greater than 12:00pm
		// subtract 12 hours to get the PM value
		if (newStartTimeHour > 12) {
			newStartTimeHour = newStartTimeHour - 12;
		}
		
		// figure out if we need to add :30 to the time
		var newStartTimeMinutes = "00";
		if (newStartTimeHourActual > newStartTimeHour) {
			newStartTimeMinutes = "30";
		} else {
			newStartTimeMinutes = "00";
		}
	
		// grab the date/name of the column
		var theColumnDay = jQuery("#days-header thead tr th:eq(" + columnNumber + ")").find(".theDay").text();
		
		alert("the column day is: " + theColumnDay);
		
		// grab current Event Information
			var currentEventMonth = jQuery(this).find(".eventStartTimeMonth").text();
			var currentEventDay = jQuery(this).find(".eventStartTimeDay").text();
			var currentEventYear = jQuery(this).find(".eventStartTimeYear").text();
			
		// update event info
		jQuery(this).find(".eventStartTime").empty().text(newStartTimeHour + ":" + newStartTimeMinutes);
		jQuery(this).find(".eventStartTimeDay").empty().text(theColumnDay);
		jQuery(this).find(".eventEndTime").empty().text((newStartTimeHour + newEndTime) + ":" + newStartTimeMinutes);;
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
	}
	
	var currentBoxHeight, newBoxHeight, boxTime, newBoxHeightBorder;

 	jQuery(".box").bind("resizestop", function(event, ui) {
 		currentBoxHeight = jQuery(this).height();

 		newBoxHeight = Math.round(currentBoxHeight / 25) * 25;
		
		jQuery(this).animate({
				"height": newBoxHeight,
				"width": "110px"
		});
			
	});
	
	
	
	jQuery(".days table").find("tr:odd").find("td").css("background-color", "#c1edff");
	jQuery("#times").find("tr:odd").find("td").css("background-color", "#c1edff");
	
	var col, row;
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
}); // ready method end 