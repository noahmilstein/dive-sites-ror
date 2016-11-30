Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "dives#index"

  resources :dives, only: [:index, :new, :history] do
    collection do
      get "/history", to: "dives#history", as: "history"
    end
  end
  resources :users, only: [:edit]

end
