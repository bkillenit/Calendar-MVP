class Participant < ActiveRecord::Base
  attr_accessible :event_id, :isAdmin, :isConfirmed, :user_id

  belongs_to :user
  belongs_to :event

end
