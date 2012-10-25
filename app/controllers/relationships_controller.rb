class RelationshipsController < ApplicationController


  def create
    @user = current_user
    @follower = User.find(params[:f_id])
    @user.follow!(@follower)

    ##Relationship.create(:follower_id => f_id, :followed_id => current_user.id )
    redirect_to :back
  end

  def destroy
    @user = Relationship.find(params[:id]).followed
    current_user.unfollow!(@user)
    redirect_to @user
  end
end