class AddResponseToParticipants < ActiveRecord::Migration
  def change
  	add_column :participants, :response_start, :datetime
  	add_column :participants, :response_end, :datetime
  end
end
