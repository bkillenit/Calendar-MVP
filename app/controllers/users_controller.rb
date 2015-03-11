class UsersController < ApplicationController
  # GET /users
  # GET /users.xml
  before_filter :authenticate_self,  :only => 'edit'
  skip_before_filter :authenticate, :only => ['new', 'create']

  def index
    @users = User.all

    respond_to do |format|
      format.html # index.html.erb.erb
      format.xml  { render :xml => @user }
    end
  end

#function to add and delete from the sessions array based on user input
  def merge_events

    #checks if the hash is already initialized
    if session[:merged_users] == nil
      session[:merged_users] = Array.new #establishes session[:merged_users] as an array
      session[:merged_users].push(params[:id])
    else

      #checks if the seesion[:merged_users] array has params[:id] value in it 
      #and deletes it from the array if it does, or adds it if it doesn't
      if session[:merged_users].include? params[:id]
        session[:merged_users].delete(params[:id])
      else  
        session[:merged_users].push(params[:id]) #pushes the id value onto the end of the array
      end  
    end  

    #less than 1 used to evealuate every situtation of the session var being blank
    #even if it has nothing in it but failed to be destroyed
    #if session[:merged_users].length < 1 
      #session[:merged_users] == nil
    #end 

    respond_to do |format|
      format.js
    end
  end

  def userlist
    @user.find(params[:id])
    @users = User.find_by_follower_id(current_user.id)
  end

  def followers
    @user = User.find(params[:id])
    @users = @user.followers.paginate(page: params[:page])
    render ''
  end

  # GET /users/1
  # GET /users/1.xml
  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @user }
    end
  end

  # GET /users/new
  # GET /users/new.xml
  def new
    @user = User.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @user }
    end
  end

  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  # POST /users
  # POST /users.xml
  def create
    @user = User.new(params[:user])

    respond_to do |format|
      if @user.save
        format.html { redirect_to(@user, :notice => 'User was successfully created.') }
        format.xml  { render :xml => @user, :status => :created, :location => @user }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @user.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /users/1
  # PUT /users/1.xml
  def update
    @user = User.find(params[:id])

    def authenticate_self
      if session[:user_id].nil?
        flash[:alert] = 'You need to login before proceed.'
        redirect_to(:controller => 'admin', :action => 'login')
      elsif session[:user_id].to_s != params[:id]
        flash[:alert] = 'You need to be the user him/herself for the action.'
        redirect_to(:controller => 'admin', :action => 'login')

      end
    end

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to(@user, :notice => 'User was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @user.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.xml
  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to(users_url) }
      format.xml  { head :ok }
    end
  end

end
