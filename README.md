# Angular 19 DummyJSON Product App

This is a simple Angular 19 application that fetches and displays products from the [DummyJSON API](https://dummyjson.com/). It includes product listing divided to 2 tabs, one's for the product list and the other's for Favorite product list with local persistence, and product details as a dialog window.

## Technologies Used

- **Angular 19**
- **RxJS** for handling asynchronous data streams
- **SignalStore** for state management
- **Angular Material** for UI components

## Features

### 1. Product Listing Page
- Fetches and displays products using the `GET /products` endpoint.
- Displays products in a **grid layout** with:
  - **Title**
  - **Price**
  - **Thumbnail**
  - **Rating**
- Includes a dropdown to filter products by category using the `GET /products/categories` endpoint.

### 2. Product Details Modal
- Clicking on a product opens a modal with:
  - **Title**
  - **Description**
  - **Stock**
  - **Price**
  - **Images** (fetched from the API)
- Users can add products to the **Favorites list**.

### 3. Favorites Page
- A dedicated **"Favorites"** page to display saved products.
- Favorites are **persisted locally** (e.g., in `signalStore`).

## 📥 Installation & Usage

### 🔄 Clone the repository
```sh
git clone https://github.com/sashakalash/products-list-app.git
cd products-list-app
```

### 📦 Install dependencies
```sh
npm install
```

### ▶️ Run the application
```sh
ng serve
```
Then open `http://localhost:4200/` in your browser.

---

## 📡 API Reference

### ✅ Get Products
**Endpoint:**  
```sh
GET https://dummyjson.com/products
```
**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "title": "Product Name",
      "price": 99.99,
      "thumbnail": "https://via.placeholder.com/150",
      "rating": 4.5
    }
  ]
}
```

### ✅ Get Categories
**Endpoint:**  
```sh
GET https://dummyjson.com/products/categories
```
**Response:**
```json
[{
    "slug": "beauty",
    "name": "Beauty",
    "url": "https://dummyjson.com/products/category/beauty"
  },
  {
    "slug": "fragrances",
    "name": "Fragrances",
    "url": "https://dummyjson.com/products/category/fragrances"
  },
  {
    "slug": "furniture",
    "name": "Furniture",
    "url": "https://dummyjson.com/products/category/furniture"
  }]
```

---

## 📜 License
This project is **MIT licensed**.
