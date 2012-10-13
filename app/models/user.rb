class User < ActiveRecord::Base
  attr_accessible :name, :password, :role

  has_many :events
  has_many :relationships, :foreign_key => 'follower_id', :dependent => :destroy

  validates :name, :presence => true, :uniqueness => true
  validates :password, :presence => true, :confirmation => true
  validates :role, :presence => true

end
