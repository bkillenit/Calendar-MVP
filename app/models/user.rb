class User < ActiveRecord::Base
  attr_accessible :name, :password, :role, :followers

  has_many :events

  has_many :event_attendees
  has_many :events, :through => :event_attendees


  has_many :relationships, :foreign_key => "follower_id", :dependent => :destroy
  has_many :reverse_relationships, :foreign_key => "followed_id",
           :class_name =>  "Relationship",
           :dependent => :destroy

  has_many :followers, :through => :reverse_relationships, :source => :follower
  has_many :followed_users, :through => :relationships, :source => :followed

  has_many :followed_relationships, :class_name => "Relationship", :foreign_key => :followed_id
  has_many :follower_relationships, :class_name => "Relationship", :foreign_key => :follower_id

  validates :name, :presence => true, :uniqueness => true
  validates :password, :presence => true, :confirmation => true
  validates :role, :presence => true

  def following_users
    self.follower_relationships.map do |r|
      User.find(r.followed_id)
    end
  end

  def followers
    self.followed_relationships.map do |r|
      User.find(r.follower_id)
    end
  end

  def following?(other_user)
    Relationship.find_by_followed_id_and_follower_id(other_user.id, self.id)
  end


  def follow!(other_user)
    Relationship.create!({:follower_id => self.id, :followed_id => other_user.id})
  end

  def followed?
    Relationship.find_by_follower_id(current_user)
  end

  def unfollow!(other_user)
    Relationship.find_by_followed_id(other_user.id).destroy
  end

  def self.search(search)
    if search
      find(:all, :conditions => ['name LIKE ?', "%#{search}%"])
    end
  end

end
