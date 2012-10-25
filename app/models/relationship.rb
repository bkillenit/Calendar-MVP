class Relationship < ActiveRecord::Base
attr_accessible :follower_id, :followed_id

belongs_to :follower, :class_name => "User"
belongs_to :followed, :class_name => "User", :foreign_key => :followed_id

validates :follower_id, :presence => true
validates :followed_id, :presence => true
end
