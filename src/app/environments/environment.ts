export const environment = {
  production: false,
  appName: 'Product Listing',
  apiUrl: 'https://dummyjson.com',
  api: {
    getProducts: 'products',
    getByCategory: 'products/categories/${{category}}',
    getProductCategories: 'products/categories'
  },
};
