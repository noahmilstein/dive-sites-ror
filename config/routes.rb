Rails.application.routes.draw do
  devise_for :users

  root "dives#index"
  get '/users', to: 'users#show'

  resources :dives, only: [:index, :new, :create, :show]
  resources :users, only: [:edit, :show]

  namespace :api do
    namespace :v1 do
      resources :divesites, only: [:index]
      resources :user, only: [:index]
      resources :userdives, only: [:index]
    end
  end
end
