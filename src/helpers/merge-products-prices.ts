export default function mergeProductsPrice(products, prices, email) {
  if (prices) {
    const priceMap = prices.reduce((result, row) => ({...result, [row.product_id]: row.price}),{})
    return products.map(p => ({...p, price: (priceMap[p.id] || 1) * p.price}))
  }

  if (!email) return products.map(p => ({...p, price: null}))

}