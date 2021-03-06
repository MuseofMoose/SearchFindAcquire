# == Schema Information
#
# Table name: reviews
#
#  id         :integer          not null, primary key
#  comment    :text
#  product_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#

class Review < ActiveRecord::Base
  	belongs_to :product
  	belongs_to :user
end
