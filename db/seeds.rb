# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)
User.create( :name => "bjkillen",
             :password => "Rosco001",
             :role => "admin")

Event.create( :title => "asdf",
              :starts_at => "2012-10-25 21:11:00 UTC",
              :ends_at => "2012-10-25 22:11:00 UTC",
              :all_day => false,
              :description => "",
              :user_id => 1)

User.create( :name => "bbb",
             :password => "bbb",
             :role => "user")