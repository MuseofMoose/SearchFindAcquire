# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Product.delete_all
Product.create(name: "iPhone", description: "New iPhone 4s.", price_in_cents: 25000, category: 'Electronics', url: "http://thesweetsetup.com/wp-content/uploads/2014/01/hurley-iphone_iphone5s_silver_portrait.jpg")
Product.create(name: "Super Bowl 49 Championship T-Shirt", description: "New England Patriots, Super Bowl 49 Champions T-Shirt", price_in_cents: 2500, category: 'Apparel', url: "http://thumbs3.ebaystatic.com/d/l225/m/mUtp8hv4zUoR4YBo-a7L_lw.jpg")
Product.create(name: "Frisbee", description: "For Spencer to practice so he can finally beat Mario Aguayo.", price_in_cents: 2000, category: 'Sporting Goods', url: "http://hahasforhoohas.com/wp-content/uploads/frisbee.jpg")
Product.create(name: "Red Bull", description: "So Fer can stay awake for most of the day.", price_in_cents: 200, category: 'Food', url: "http://www.jointedz.co.uk/wp-content/uploads/2014/12/Red-Bull-Energy-Drink-pic.jpg")
Product.create(name: "Casio Watch", description: "Just 'cause Tasio and Casio sound the same.", price_in_cents: 4500, category: 'Electronics', url: "http://en.wikialpha.org/wiki/images/9/9a/Casio_F-91W.jpg")
Product.create(name: "Samsung HDTV", description: "50 inch HDTV by Samsung.", price_in_cents: 500000, category: "Electronics", url: "http://www.technologytell.com/hometech/files/2014/07/Samsung-HDTV.jpg")
Product.create(name: "T-Shirt", description: "Plain white tee.", price_in_cents: 1000, category: "Apparel", url: "http://i00.i.aliimg.com/img/pb/572/215/269/1285744913868_hz-fileserver1_6161233.jpg")
Product.create(name: "Laptop", description: "15.4in MacBook Pro.", price_in_cents: 175000, category: "Electronics", url: "http://www.replacebase.co.uk/ekmps/shops/replacebase/resources/Design/macbook-pro.jpg")
Product.create(name: "Soccer ball", description: "Replica of Adidas ball used during World Cup 2014.", price_in_cents: 12500, category: "Sporting Goods", url: "http://cdn3.volusion.com/goz35.avhz4/v/vspfiles/photos/EB-ADW43119-2.jpg?1381832849")


