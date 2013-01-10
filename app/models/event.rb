class Event < ActiveRecord::Base

  attr_accessible :ends_at, :starts_at, :title, :description, :user_id, :all_day, :participants, :users
  attr_accessor :className, :editable

  has_many :participants, :dependent => :destroy
  accepts_nested_attributes_for :participants
  has_many :users, :through => :participants

  validates :user_id, :presence => true
  validates :title, :presence => true
  validates_datetime :ends_at, :after => :starts_at, :after_message => "Please select end time after start time" # Method symbol

  scope :before, lambda {|end_time| {:conditions => ["ends_at < ?", Event.format_date(end_time)] }}
  scope :after, lambda {|start_time| {:conditions => ["starts_at > ?", Event.format_date(start_time)] }}
  
  # need to override the json view to return what full_calendar is expecting.
  # http://arshaw.com/fullcalendar/docs/event_data/Event_Object/
  def as_json(options = {})
    {
      :id => self.id,
      :title => self.title,
      :description => self.description || "",
      :start => starts_at.rfc822,
      :end => ends_at.rfc822,
      :allDay => self.all_day,
      :recurring => false,
      :url => Rails.application.routes.url_helpers.event_path(id),
      :className => self.className,
      :editable => self.editable
    }
    
  end
 
  def self.format_date(date_time)
    Time.at(date_time.to_i).to_formatted_s(:db)
  end

  # This method should find all events that overlap a given date_time
  # The only question I have is whether it's possible to chain the .find call
  # onto the .where call. 
  # TODO: Optimize this SQL query, perhaps using ARel
  def find_conflicts(event, date_time, merged_users)
    merged_users << event.user_id
    # get starts at, ends at fields of all events of merged users can be potential conflicts
    @potentials = Event.where(:user_id => merged_users).select("starts_at, ends_at, title")
    # select conflicts from potential conflicts. there should be a way to make
    # this a part of the above SQL query
    @potentials.select { |potential| potential.starts_at < date_time && potential.ends_at > date_time }
  end

  def self.Participating?(id)

    # finds all participant objects of the current user, current_user.id passed as function argument 
    participants = Participant.find_all_by_user_id(id)
    events = Array.new

    if participants 
        participants.each do |p|
         event = Event.find(p.event_id)  

          #logic for checking if the event was created by the current user
          if p.isAdmin == false
            event.editable = false
            if p.hasResponded == false
              @Admin = Participant.find_by_event_id_and_isAdmin(event.id, true)
              @owner = User.find_by_id(@Admin.user_id)
              event.className = 'unconfirmed-event'
              event.title = "Request for " +  event.title + " from " + @owner.name

            elsif p.hasResponded == true
              if p.isAttending == true
                event.className = 'confirmed-event'
              elsif p.isAttending == false
                event.className = 'hide'  
              end  
            end

          #else for filling event with isAdmin event characteristics  
          else
            event.className = 'user-event'
            event.editable = true
          end 

          #pushes the event object to array after formatting
          events.push event
        end
    end

      #returns correctly formatted events array before JSON conversion
      return events 
  end
end
