Rails.application.routes.draw do
  resources :records,only: [:index, :create, :update, :destroy]
  resources :users, only: [:index, :create, :update, :destroy]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post 'auth/signup' => 'auth#signup'
  post 'auth/signin' => 'auth#signin'
 
end
