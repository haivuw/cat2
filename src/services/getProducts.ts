export default async function getProducts(email: string) {
  if (typeof window !== 'undefined') {
    return fetch(`/api/products/?email=${email}`).then(response => response.json())
  }
}