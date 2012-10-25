class User < ActiveRecord::Base
  attr_accessible :name, :password, :role, :followers

  has_many :events
  has_many :relationships, :dependent => :destroy
  has_many :followed_users, :through => :relationships, :source => :followed

  has_many :reverse_relationships, :foreign_key => "followed_id",
           :class_name =>  "Relationship",
           :dependent => :destroy

  has_many :followers, :through => :reverse_relationships, :source => :follower

  validates :name, :presence => true, :uniqueness => true
  validates :password, :presence => true, :confirmation => true
  validates :role, :presence => true

  def following?(other_user)
    Relationship.find_by_followed_id_and_follower_id(other_user.id, self.id)
  end

  def follow!(other_user)
    Relationship.create!({:follower_id => other_user.id, :followed_id => self.id})
  end

  def unfollow!(other_user)
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
