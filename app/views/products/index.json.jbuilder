json.array!(@products) do |product|
  json.extract! product, :id, :name, :description, :price_in_cents, :category
  json.url product_url(product, format: :json)
end
