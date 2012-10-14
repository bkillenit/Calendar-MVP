class User < ActiveRecord::Base
  attr_accessible :name, :password, :role

  has_many :events
  has_many :relationships, :foreign_key => 'follower_id', :dependent => :destroy
  has_many :followed_users, through: :relationships, source: :followed

  has_many :reverse_relationships, foreign_key: "followed_id",
          class_name:  "Relationship",
           dependent:   :destroy

  has_many :followers, through: :reverse_relationships, source: :follower

  validates :name, :presence => true, :uniqueness => true
  validates :password, :presence => true, :confirmation => true
  validates :role, :presence => true

  def self.authenticate(username, pass)
    user = self.find_by_name(username)
    if user
      if user.pwd != encrypted_password(pass, user.seed)

        user = nil
      end
    end
    user
  end

  def following?(other_user)
    relationships.find_by_followed_id(other_user.id)
  end

  def follow!(other_user)
    relationships.create!(followed_id: other_user.id)
  end

  def unfollow!(other_user)
    relationships.find_by_followed_id(other_user.id).destroy
  end

end
