## Summary

This is a calendar web app that displays open times from multiple calendars using Ruby on Rails, HTML/CSS & jQuery. The project's intent was to solve the problem of merging multiple calendars from a group together and then finding an open time for that group to meet. Working implemented functionality includes merging multiple calendars, user search and friend system, user registration and authentication, event CRUD, and standard calendar view controls. Details on testing the app with predefined UI flow is included below.

### Technical Details
I extended on a Rails app containing a jQuery calendar plugin and basic Rails CRUD functionality. I then implemented my own design and functionality on top of the project.

The calendar plugin:
http://fullcalendar.io/

The base Rails app:
https://github.com/bokmann/fullcalendar_assets

### Testing the App
I have set up 1 test account and 2 accounts that are friends to that account so you can test the calendar merge functionality of the application.

Please follow the steps below:
1. Go to https://checkitmvp.herokuapp.com/
2. Login with credentials
  * user: test 
  * pass: test
3. Click on the merge button for both of the friends displayed in the left side column
  * the friends' events will show on the calendar as blocks of shadows, indicating that they are busy during that time range
  * events that overlap will create a darker shadow, indicating the degree of the group's busyness over that time range
4. Navigate the calendar to view open and busy times
   