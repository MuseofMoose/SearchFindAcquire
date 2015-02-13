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

  private

  def set_total
  	total = 0
  end

end
