class AddIsConfirmedAndIsAdminToEventAttendees < ActiveRecord::Migration
  def change
    add_column :event_attendees, :isConfirmed, :boolean
    add_column :event_attendees, :isAdmin, :boolean
  end
end
