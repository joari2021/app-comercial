class Supplier < ApplicationRecord
    has_many :products
    has_many :warehouse_records

    def self.buscador(termino)
        Supplier.where("name LIKE ?", "%#{termino}%")
    end

    validates :name, :address, :phone, presence: { message:" Este campo no puede estar vacio" }
end
