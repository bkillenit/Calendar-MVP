class Responses < ActiveRecord::Base
  attr_accessible :event_id, :response, :user_id

  def accept(event_id, user_id) 
  	 participant = Participant.find_by_user_id_and_event_id(user_id, event_id)
	   participant.isConfirmed = true
	   participant.save
  end	

  def reject(event_id, user_id) 
  	 Participant.find_by_user_id_and_event_id(user_id, event_id).destroy
  end
  
  def suggest_time(event_id, user_id, time)
  	
  end	
end
