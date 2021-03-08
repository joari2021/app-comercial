class Client < ApplicationRecord
    has_many :sales

    def self.buscador(termino)
        Client.where("name LIKE ?", "%#{termino}%")
    end

    validates :name, :address, :phone, presence: { message:" Este campo no puede estar vacio" }


end
