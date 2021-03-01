class Client < ApplicationRecord
    has_many :sales

    validates :name, :address, :phone, presence: { message:" Este campo no puede estar vacio" }
end
