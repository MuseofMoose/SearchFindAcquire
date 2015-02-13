class Product < ActiveRecord::Base
	validates :description, :name, presence: true
	validates :price_in_cents, numericality: {only_integer: true, greater_than: 0}

	has_many :reviews

	def self.search(search)
		if search
			where('name LIKE ? OR description LIKE ? OR category LIKE ?', "%#{search}%", "%#{search}%", "%#{search}%")
		else
			self.all
		end
	end

	def formatted_price	
		price_in_dollars = price_in_cents.to_f / 100
		sprintf("$%.2f", price_in_dollars)
	end
end