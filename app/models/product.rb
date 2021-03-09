class Product < ApplicationRecord
  belongs_to :category
  belongs_to :supplier
  has_many :warehouse_records

  mount_uploader :image, FotoProductoUploader

  def self.buscador(termino)
    Product.where("name LIKE ?", "%#{termino}%")
  end
end