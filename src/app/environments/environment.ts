export const environment = {
  production: false,
  appName: 'Product Listing',
  apiUrl: 'https://dummyjson.com',
  api: {
    getProducts: 'products/?delay=1000',
    getProductsByCategory: 'products/category/${{category}}/?delay=1000',
    getProductCategories: 'products/categories/?delay=1000'
  },
};
