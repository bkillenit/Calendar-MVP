class AdminController < ApplicationController
  def login
    if request.post?
      user = User.find_by_name(params[:name])
      if ! user.nil? && user.password == params[:password]
        session[:user_id] = user.id
        redirect_to(calendar_index_path)
      else
        redirect_to(:back, :alert => 'Invalid user name/password.')
      end
    end
  end

  def logout
    session[:user_id] = nil
    redirect_to :controller => 'admin', :action => 'login'
  end
end
