class EventsController < ApplicationController
  # GET /events
  # GET /events.xml
  def index   
    # full_calendar will hit the index method with query parameters
    # 'start' and 'end' in order to filter the results for the
    # appropriate month/week/day.  It should be possible to change
    # this to be starts_at and ends_at to match rails conventions.
    # I'll eventually do that to make the demo a little cleaner.

    logger.info("===== request.uri: " + request.url )
    logger.info("===== params: " + params.to_s)


    @events =  current_user.events
    logger.info("===== Current user has " + @events.size.to_s + " events.")

    if params[:users]
      user_ids = params[:users].split(",")
      user_ids.each do |user_id|
        user = User.find user_id.to_i
        @events |= user.events
        logger.info("===== " + user.name + " has " + user.events.size.to_s + " events.")
      end
    else

    logger.info("==== Params[:users] is nil!!!!")

    end

    # @events = current_user.events.scoped
    # @events = @events.after(params['start']) if (params['start'])
    # @events = @events.before(params['end']) if (params['end'])

    @events = current_user.events.scoped  
    @events = @events.after(params['start']) if (params['start'])
    @events = @events.before(params['end']) if (params['end'])
    #@shadows = users_to_merge.events.scoped

    
    respond_to do |format|
      format.html # index.html.erb.erb
      format.xml  { render :xml => @events }
      format.js  { render :json => @events }
    end
  end

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

    @event = Event.create(params[:event])
    current_user.events.push @event

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
