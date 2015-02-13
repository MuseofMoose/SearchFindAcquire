class AddUrlToProduct < ActiveRecord::Migration
  def change
    add_reference :products, :product, index: true
    add_foreign_key :products, :products
    add_column :products, :url, :string
  end
end
