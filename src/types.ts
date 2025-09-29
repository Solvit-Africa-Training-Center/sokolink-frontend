// General Product Variation (flexible for electronics/clothes/etc.)
export interface ProductVariation {
  colors?: string[];
  storage?: string[];
  sizes?: string[];
  format?: string[];
  memory?: string[];
  language?: string[];
}

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

// API Response (all products)
export interface ProductsResponse {
  success: boolean;
  message: string;
  data: Product[];
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
// Add to your existing types file (src/types.ts)

// Login Request for Retailer/Wholesaler
export interface RetailerWholesalerLoginRequest {
  email: string;
  password: string;
}

// Login Response for Retailer/Wholesaler
export interface RetailerWholesalerLoginResponse {
  data: {
    token: string;
  };
  message: string;
  success: boolean;
}
