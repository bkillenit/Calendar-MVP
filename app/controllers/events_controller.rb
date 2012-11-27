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

      @events.each do |e|
        e.title = ""
      end

      respond_to do |format|
        format.html # index.html.erb.erb
        format.xml  { render :xml => @events }
        format.js  { render :json => @events }
      end
    else
      @events =  current_user.events
       
      #add events that the user is participating in to the calendar  
      @events.push(Event.Participating?(current_user.id))
      #logger.info("========= @events: " + @events.to_json + "  ============") 
           
      @events = @events.after(params['start']) if (params['start'])
      @events = @events.before(params['end']) if (params['end'])

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
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @event.errors, :status => :unprocessable_entity }
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
