require 'time'

class EventsController < ApplicationController
  def index
    # full_calendar will hit the index method with query parameters
    # 'start' and 'end' in order to filter the results for the
    # appropriate month/week/day.  It should be possible to change
    # this to be starts_at and ends_at to match rails conventions.
    # I'll eventually do that to make the demo a little cleaner.

    if params[:user_id]
      user = User.find(params[:user_id])
      @events =  user.events

      #@same_event = Paricipant.find_all_by_user_id(user.id)
      @events.each do |e|
        e.title = ""
        
      end

      respond_to do |format|
        format.html # index.html.erb.erb
        format.xml  { render :xml => @events }
        format.js  { render :json => @events }
      end
    else
      #add events that the user is participating in to the calendar  
      @events = Event.Participating?(current_user.id)
      #logger.info("========= @events: " + @events.to_json + "  ============") 
           
      #@events = @events.after(params['start']) if (params['start'])
      #@events = @events.before(params['end']) if (params['end'])

      respond_to do |format|
        format.html # index.html.erb.erb
        format.xml  { render :xml => @events }
        format.js  { render :json => @events.to_json }
      end
    end

  end


  # GET /events
  # GET /events.xml
  #def index0
    # full_calendar will hit the index method with query parameters
    # 'start' and 'end' in order to filter the results for the
    # appropriate month/week/day.  It should be possible to change
    # this to be starts_at and ends_at to match rails conventions.
    # I'll eventually do that to make the demo a little cleaner.

    #@events =  current_user.events

    #if params[:users]
      #user_ids = params[:users].split(",")
      #user_ids.each do |user_id|
        #user = User.find user_id.to_i
        #@events |= user.events
      #end
    #end

    #@user = User.find(params[:user_id])
    #@events = Events.find_by_user_id(@user.id)

    #@events = current_user.events.scoped
    #@events = @events.after(params['start']) if (params['start'])
    #@events = @events.before(params['end']) if (params['end'])

    #respond_to do |format|
      #format.html # index.html.erb.erb
      #format.xml  { render :xml => @events }
      #format.js  { render :json => @events }
    #end
  #end

  def mergeUser
    params[:merged_user] = self.id
  end

  # GET /events/1
  # GET /events/1.xml
  def show
    @event = Event.find(params[:id])
    
    if params[:type] 
      
      if params[:type] == 'user'
        render 'events/show', :locals=>{:event => @event}

      elsif params[:type] == 'unconfirmed'
        render 'events/accept_reject', :locals=>{:event => @event}

      elsif params[:type] == 'confirmed'
        render 'events/response_details', :locals=>{:event => @event}  

      elsif params[:type] == 'merge-conflict' 
        @date = params[:date]
        @merged_users = session[:merged_users]
        # @event.find_conflicts # (@date, session[:merged_users])
        render 'events/conflicts', :locals=>{:event => @event, :date => @date, :merged_users => @merged_users}
      end #end of the conditional for  rendering the partial based on params[:type]

    end #end of the params type if block
  end

  # GET /events/new
  # GET /events/new.xml
  def new
    @event = current_user.events.build

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @event }
      format.js # return the HTML block for use by the AJAX new.js.erb
    end
  end

  # GET /events/1/edit
  def edit
    @event = Event.find(params[:id])

    respond_to do |format|
       format.html { event_url(@event) }
       format.js
    end
  end

  # POST /events
  # POST /events.xml
  def create

    if params[:event][:user_id].nil?
      params[:event][:user_id] = current_user.id.to_s
    end  
 
    @event = Event.create(params[:event].except(:participants))
    current_user.events.push @event
    @event.participants.create(:user_id => current_user.id, :hasResponded => false, :isAttending => true ,:isAdmin => true ).save

    respond_to do |format|
      if @event.save
        format.html { redirect_to(:controller => "calendar", :action => "index", :notice => 'Event was successfully created.') }
        format.xml  { render :xml => @event, :status => :created, :location => @event }
        format.js
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @event.errors, :status => :unprocessable_entity }
        format.js
      end
    end



  end

  # PUT /events/1
  # PUT /events/1.xml
  # PUT /events/1.js
  # when we drag an event on the calendar (from day to day on the month view, or stretching
  # it on the week or day view), this method will be called to update the values.
  def update
    @event = Event.find(params[:id])
    
    start_time = Time.parse(params[:event][:starts_at])
    end_time = Time.parse(params[:event][:ends_at])
    time_zone_offset = -1 * params[:event][:time_zone_offset].to_i

    if start_time.gmt_offset/(3600) != time_zone_offset
      params[:event][:starts_at] = Time.at(start_time.to_i - time_zone_offset * 3600)
    end
    if end_time.gmt_offset/(3600) != time_zone_offset
      params[:event][:ends_at] = Time.at(end_time.to_i - time_zone_offset * 3600)
    end

    respond_to do |format|
      if @event.update_attributes(params[:event])
        format.html { redirect_to(@event, :notice => 'Event was successfully updated.') }
        format.xml  { head :ok }
        format.js { head :ok}
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @event.errors, :status => :unprocessable_entity }
        format.js  { render :js => @event.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1
  # DELETE /events/1.xml
  def destroy
    @event = Event.find(params[:id])
    @event.destroy

    respond_to do |format|
      format.html { redirect_to(events_url) }
      format.xml  { head :ok }
    end
  end

  # PUT /events/1/accept_request
  def accept_request
    # we need an event id and user id
    # user id is current_user.id, event_id will be params[:event_id]
    @participant = Participant.find_by_event_id_and_user_id(params[:id], current_user.id)
    @participant.hasResponded = true
    @participant.isAttending = true
    
    respond_to do |format| 
      if @participant.save 
        format.js # renders accept_request.js.erb
      else 
        # TODO: this code was copy/pasted from other respond_to blocks 
        # We should figure out what we actually want to do here.
        format.js { render :js => @participant.errors, :status => :unprocessable_entity}
      end
    end
  end

  def reject_request
    # This isn't DRY, but we can eventually refactor this into respond_to_request, a method
    # and route in which we can either accept or reject an event
    @participant = Participant.find_by_event_id_and_user_id(params[:id], current_user.id)

    # By setting the isAttending to false, the event is given a class of .hide on render of the calendar 
    # The Particpating? function in the Events model assigns the class attributes for each event in the JSON feed
    @participant.hasResponded = true
    @participant.isAttending = false
    
    respond_to do |format| 
      if @participant.save 
        format.js # renders reject_request.js.erb
      else 
        # TODO: this code was copy/pasted from other respond_to blocks 
        # We should figure out what we actually want to do here.
        format.js { render :js => @participant.errors, :status => :unprocessable_entity}
      end
    end
  end
end # Controller End
