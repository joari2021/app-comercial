Rails.application.routes.draw do
  
  root to: 'home#index'
  devise_for :users
  resources :categories, except: [:show]
  resources :clients, except: [:show]
  resources :suppliers, except: [:show]
  resources :products
  resources :sales
  get 'buscador_productos/:termino', to: 'products#buscador'
  post 'add_item_venta', to: 'sales#add_item'
  get 'buscador_clientes/:termino', to: 'clients#buscador'
  post 'add_cliente_venta', to: 'sales#add_cliente'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
