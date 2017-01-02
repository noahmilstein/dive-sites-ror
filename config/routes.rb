Rails.application.routes.draw do
  devise_for :users

  root "dives#index"

  resources :dives, only: [:index, :new, :create, :show]
  resources :users, only: [:edit, :show]

  namespace :api do
    namespace :v1 do
      resources :divesites, only: [:index]
    end
  end
end
