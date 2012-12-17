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

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @event }
      format.js { render :json => @event.to_json }
    end
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
  end

  # POST /events
  # POST /events.xml
  def create

    #logger.info("========= User id in session: " + session[:user_id].to_s + "============")
    #logger.info("======= Params hash: " + params[:event][:participants].to_s + " ==============")
    if params[:event][:user_id].nil?
      params[:event][:user_id] = current_user.id.to_s
      logger.info("======= Event object: " + params[:event].to_s + " ==============")
    end  

    #pull the params from the POST and converts it to Ruby DateTime and clears out params of unneccesary data
    if params[:event][:year] != nil
      @starts_at = DateTime.new(params[:event][:year].to_i,params[:event][:month].to_i,
        params[:event][:day].to_i,params[:event][:hour].to_i,params[:event][:start_minutes].to_i)
      
      @ends_at = DateTime.new(params[:event][:year].to_i,params[:event][:month].to_i,
        params[:event][:day].to_i,params[:event][:hour].to_i,params[:event][:end_minutes].to_i)

      params[:event][:starts_at] = @starts_at
      params[:event][:ends_at] = @ends_at

      params[:event].delete :year
      params[:event].delete :month
      params[:event].delete :day
      params[:event].delete :hour
      params[:event].delete :start_minutes
      params[:event].delete :end_minutes

      #logger.info("================ Params hash after: " + params.to_s + "==============")
    end  

    @event = Event.create(params[:event].except(:participants))
    current_user.events.push @event
    @event.participants.create(:user_id => current_user.id, :isConfirmed => true, :isAdmin => true ).save

    if params[:event][:participants]
      @p = params[:event][:participants].split(",")

      #logger.info("======= Params hash in var: " + @p.to_s + " ==============")
        @p.each do |p|
          @event.participants.create( :event_id => @event.id,
            :user_id => p, :isConfirmed => false, :isAdmin => false ).save

          Notifier.meeting_requested(@current_user,p,@event).deliver
      end
    end
    

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
  # viv la REST!
  def update
    @event = Event.find(params[:id])
    
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
end
