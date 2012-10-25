class User < ActiveRecord::Base
  attr_accessible :name, :password, :role, :followers

  has_many :events
  has_many :relationships, :foreign_key => 'follower_id', :dependent => :destroy
  has_many :followed_users, :through => :relationships, :source => :followed

  has_many :reverse_relationships, :foreign_key => "followed_id",
           :class_name =>  "Relationship",
           :dependent => :destroy

  has_many :followers, :through => :reverse_relationships, :source => :follower

  validates :name, :presence => true, :uniqueness => true
  validates :password, :presence => true, :confirmation => true
  validates :role, :presence => true

  def self.following?(other_user)
    Relationship.find_by_followed_id(other_user.id)
  end

  def self.follow!(other_user)
    Relationship.create!(@followed_id = other_user.id)
  end

  def self.unfollow!(other_user)
    Relationship.find_by_followed_id(other_user.id).destroy
  end

  def self.search(search)
    if search
      find(:all, :conditions => ['name LIKE ?', "%#{search}%"])
    else
      find(:all)
    end
  end

end
