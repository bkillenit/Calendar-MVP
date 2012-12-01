class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.integer :user_id
      t.integer :event_id
      t.string :response

      t.timestamps
    end
  end
end
