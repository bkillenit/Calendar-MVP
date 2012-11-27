class Participant < ActiveRecord::Base
  attr_accessible :user_id, :event_id, :isConfirmed, :isAdmin

  belongs_to :event
  belongs_to :user

  def requested_events
  	self.find_by_user_id(current_user.id)
  end	

end
