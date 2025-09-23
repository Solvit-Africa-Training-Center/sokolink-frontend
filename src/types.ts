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
export interface AdminLoginRequest {
  email: string;
  password: string;
}
export interface AdminLoginResponse<T> {
  token: string;
  user: T
}
export interface User {
  userId: string;
  name: string;
  email: string;
}
export interface Retailer {
  id: string;
  name: string;
  email: string;
}
export interface Wholesaler {
  id: string;
  name: string;
  email: string;
  status: string;
  businessLicenceDocument: string;
  taxCertificate: string;
}
// types.ts (add types if not yet defined)
export interface WholesalerRegisterRequest {
  name: string;
  email: string;
  password: string;
  roleName: "Wholesaler";
  phoneNumber: string;
  businessName: string;
  taxNumber: string;
  businessAddress: string;
  businessLicenseNumber: string;
  businessLicenseDocument: File; // file input
  taxCertificate: File; // file input
}

export interface WholesalerRegisterResponse {
  message: string;
  wholesalerId: string;
}
