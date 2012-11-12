class AddIsConfirmedAndIsAdminToEventAttendees < ActiveRecord::Migration
  def change
    add_column :event_attendees, :isConfirmed, :string
    add_column :event_attendees, :isAdmin, :string
  end
end
