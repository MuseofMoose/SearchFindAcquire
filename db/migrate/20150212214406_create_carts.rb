class CreateCarts < ActiveRecord::Migration
  def change
    create_table :carts do |t|
      t.integer :total
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :carts, :users

    create_table :cart_products do |t|
      t.references :product, index: true
      t.references :cart, index: true

      t.timestamps null: false
    end
 
    add_foreign_key :cart_products, :products
    add_foreign_key :cart_products, :carts
  end
end
