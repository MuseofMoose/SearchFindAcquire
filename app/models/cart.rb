# == Schema Information
#
# Table name: carts
#
#  id         :integer          not null, primary key
#  total      :integer
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Cart < ActiveRecord::Base
  belongs_to :user
  has_many :cart_products
  has_many :products, through: :cart_products
  before_create :set_total

  def remove(item)
  	CartProduct.where(cart: self, product: item).take
  end

  def add_product(product)
    if self.cart_products.map(&:product).include? product
      matching_cart_product = cart_products.select { |cart_product| cart_product.product == product }
      matching_cart_product.first.quantity += 1
      matching_cart_product.first.save
    else
      self.cart_products.create(product: product, quantity: 1)
    end
  end

  private

  def set_total
  	total = 0
  end
end
