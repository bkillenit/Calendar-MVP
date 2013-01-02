class RefactorParticipantsTable < ActiveRecord::Migration
  def up
  	remove_column :participants, :isConfirmed
  	add_column :participants, :isAttending, :boolean
  	add_column :participants, :hasResponded, :boolean
  end

  def down
  	add_column :participants, :isConfirmed, :boolean
  	remove_column :participants, :isAttending
  	remove_column :participants, :hasResponded
  end
end
