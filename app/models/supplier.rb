class Supplier < ApplicationRecord
    has_many :products
    has_many :warehouse_records

    validates :name, :address, :phone, presence: { message:" Este campo no puede estar vacio" }
end
