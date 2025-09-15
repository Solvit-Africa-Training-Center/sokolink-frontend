// types/product.ts

// Variation interface for product options
export interface ProductVariation {
  colors: string[];
  storage: string[];
}

// Main Product interface
export interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  productCatId: string;
  productSubCatId: string;
  userId: string;
  variation: ProductVariation;
  images: string[];
  isAvailable: boolean;
  expiredAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// API Response interface
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Product List response (for multiple products)
export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Parameters for getting products
export interface GetProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'name' | 'price' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

// Parameters for creating a product
export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  productCatId: string;
  productSubCatId: string;
  variation: ProductVariation;
  images: string[];
  isAvailable?: boolean;
}

// Parameters for updating a product
export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  productId: string;
}