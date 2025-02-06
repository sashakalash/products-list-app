export interface IProductReview {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}

export interface IProductDimension {
  width: number;
  height: number;
  depth: number;
}

export interface IProductMeta {
  createdAt: Date;
  updatedAt: Date;
  barcode: number;
  qrCode: string;
}

export interface IProductCategory {
  slug: string;
  name: string;
  url: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: IProductCategory;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: IProductDimension;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: IProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: IProductMeta;
  thumbnail: string;
  images: string[];
}
