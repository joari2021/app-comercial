class Category < ApplicationRecord
    has_many :products

    validates :name, :description, presence: { message:" Este campo no puede estar vacio" }
end
