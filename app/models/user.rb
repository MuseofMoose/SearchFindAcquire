# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string
#  email           :string
#  password        :string
#  balance         :float
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  password_digest :string
#

class User < ActiveRecord::Base
	has_many :products
	has_many :reviews
	has_one :cart
	has_secure_password
	validates :email, uniqueness: true, null: false
	validates :name, null: false
	validates :password, confirmation: true, null: false
	validates :password_confirmation, null: false

	after_create :create_cart

	private

	def create_cart
		self.cart = Cart.create
		self.save
	end
end
