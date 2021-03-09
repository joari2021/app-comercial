class ChangeColumnToWarehouseRecord < ActiveRecord::Migration[6.0]
  def change
    remove_reference :warehouse_records, :supplier
    add_reference :warehouse_records, :supplier, foreign_key: true

    remove_reference :warehouse_records, :product
    add_reference :warehouse_records, :product, foreign_key: true
  end
end
