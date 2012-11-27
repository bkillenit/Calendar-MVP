class Participant < ActiveRecord::Base
  attr_accessible :user_id, :event_id, :isConfirmed, :isAdmin

  belongs_to :event
  belongs_to :user


end
