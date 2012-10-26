class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :authenticate,  :except => 'login'

  helper_method :current_user
  helper_method :users_to_merge

  def authenticate
    if session[:user_id].nil?
      redirect_to :controller => 'admin', :action => 'login'
    end
  end

  # helper method that allows us to get the current user object in other
  # controllers
  def current_user 
    @current_user = User.find(session[:user_id])
  end

  # helper method that allows us to access the users' calendars whose events
  # we're going to merge
  def users_to_merge
    if params[:users_to_merge]
      @users_to_merge = params[:users_to_merge].map { |user_id| User.find(user_id) }
    end
  end

  # got these tips from
  # http://lyconic.com/blog/2010/08/03/dry-up-your-ajax-code-with-the-jquery-rest-plugin
  before_filter :correct_safari_and_ie_accept_headers
  after_filter :set_xhr_flash

  def set_xhr_flash
    flash.discard if request.xhr?
  end

  def correct_safari_and_ie_accept_headers
    ajax_request_types = ['text/javascript', 'application/json', 'text/xml']
    request.accepts.sort! { |x, y| ajax_request_types.include?(y.to_s) ? 1 : -1 } if request.xhr?
  end
  
  
end
