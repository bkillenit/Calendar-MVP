Calendar::Application.routes.draw do

  get "searches/search"

  get "admin/login"

  get "admin/logout"

  post "admin/login"

  put "events/:id/accept_request", {:controller => 'events', :action => 'accept_request'}

  match "index" => "calendar/index"

  resources :users do
    member do
      get :following, :followers
    end
  end

  resources :users, only: [:index, :show] do
    resources :events, only: [:index, :show]
  end

  get 'users/:id/merge_events', {:controller => 'users', :action => 'merge_events'} 

  post "relationships/create"



  resources :events

  get "calendar/index:users", {:controller => :calendar, :action => :index, :users => :users}

  get "calendar/index"
  post "calendar/index"

  get "relationships/create"

  post "relationships/create"

  resources :sessions, :only => [:new, :create, :destroy]
  resources :relationships, :only => [:create, :destroy]


  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.erb.
  # root :to => "welcome#index"

  root :to => "calendar#index"
  
  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
