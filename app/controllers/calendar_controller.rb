# calendars are not (yet) a resource in the rails sense of thw word - we
# simply have a url like calendar/index to get the one and only calendar
# this demo serves up.
class CalendarController < ApplicationController

  def index
  	#search bar input from left panel
    if params[:search] && params[:search] != ""
      @users = User.search(params[:search])
    end

    respond_to do |format|
      format.html # index.html.erb
      format.js 
    end
  end

end
