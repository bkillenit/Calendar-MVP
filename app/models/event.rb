class Event < ActiveRecord::Base

  attr_accessible :ends_at, :starts_at, :title, :description, :user_id, :all_day

  belongs_to :user
  #has_many :event_attendees
  #has_many :users, :through => :event_attendees

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
      :url => Rails.application.routes.url_helpers.event_path(id)
    }
    
  end

  def invite
    EventAttendee.create!({:user_id => current_user.id, :event_id => self.id})
  end
  
  def is_user_available?(user_id)
    @start = self.starts_at
    @end = self.ends_at
    @conflicts = User.find(user_id).events.select {|e| e.starts_at.between?(@start,@end) or e.ends_at.between?(@start,@end)}
  end

  def self.format_date(date_time)
    Time.at(date_time.to_i).to_formatted_s(:db)
  end
end
