# == Schema Information
#
# Table name: cart_products
#
#  id         :integer          not null, primary key
#  product_id :integer
#  cart_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CartProduct < ActiveRecord::Base
  belongs_to :product
  belongs_to :cart
end
