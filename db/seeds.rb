# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Product.delete_all
Product.create(name: "iPhone", description: "New iPhone 4s.", price_in_cents: 25000, category: 'Electronics')
Product.create(name: "Super Bowl 49 Championship T-Shirt", description: "New England Patriots, Super Bowl 49 Champions T-Shirt", price_in_cents: 2500, category: 'Apparel')
Product.create(name: "Frisbee", description: "For Spencer to practice so he can finally beat Mario Aguayo.", price_in_cents: 2000, category: 'Sporting Goods')
Product.create(name: "Red Bull", description: "So Fer can stay awake for most of the day.", price_in_cents: 200, category: 'Food')
Product.create(name: "Casio Watch", description: "Just 'cause Tasio and Casio sound the same.", price_in_cents: 4500, category: 'Electronics')
Product.create(name: "Samsung HDTV", description: "50 inch HDTV by Samsung.", price_in_cents: 500000, category: "Electronics")
Product.create(name: "T-Shirt", description: "Plain white tee.", price_in_cents: 1000, category: "Apparel")
Product.create(name: "Laptop", description: "15.4in MacBook Pro.", price_in_cents: 175000, category: "Electronics")
Product.create(name: "Soccer ball", description: "Replica of Adidas ball used during World Cup 2014.", price_in_cents: 12500, category: "Sporting Goods")


