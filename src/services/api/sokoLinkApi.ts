// services/api/sokoLinkApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  CreateProductRequest,
  ProductsResponse,
  AdminLoginRequest,
  AdminLoginResponse,WholesalerRegisterRequest,WholesalerRegisterResponse,
  User,
  Wholesaler,
  Retailer
} from '../../types';
// src/types.ts

export interface ProductVariation {
  colors?: string[];
  storage?: string[];
  memory?: string[];
  sizes?: string[];
  format?: string[];
  language?: string[];
}

export interface Product {
  id: string;
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

// Response when fetching all products
export type AdminProductsResponse = Product[];
// Response when fetching a single product

export const sokoLinkApi = createApi({
  reducerPath: 'productsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),

  // Add a tag type for wholesalers so we can invalidate
  tagTypes: ['Product', 'Wholesaler'],
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: false,
  keepUnusedDataFor: 60,

  endpoints: (builder) => ({
    // GET all products
   getProducts: builder.query<ProductsResponse, void>({
  query: () => 'products',
  providesTags: ['Product'],
}),


    // GET single product by ID
    getProductById: builder.query<any, any>({
      query: (productId) => `products/${productId}`,
      providesTags:['Product'],
    }),

    // CREATE a new product
    createProduct: builder.mutation<any, CreateProductRequest>({
      query: (newProduct) => ({
        url: 'products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Product'],
    }),

    adminLogin: builder.mutation<AdminLoginResponse<User>, AdminLoginRequest>({
      query: (adminLogin) => ({
        url: 'admin/login',
        method: 'POST',
        body: adminLogin,
      }),
    }),
    
    // 👇 NEW: Retailer/Wholesaler Login
    retailerWholesalerLogin: builder.mutation<any, any>({
      query: (loginData) => ({
        url: 'login', // Your endpoint is /login
        method: 'POST',
        body: loginData,
      }),
    }),

    // --- Wholesalers ---
    // GET admin wholesalers (now provides Wholesaler tag)
    getAdminWholesalers: builder.query<Wholesaler[], void>({
      query: () => 'admin/wholesalers',
      providesTags: (result) =>
        result
          ? [
              // provide a tag for the whole list and for each item for fine-grained invalidation
              { type: 'Wholesaler' as const, id: 'LIST' },
              ...result.map((w) => ({ type: 'Wholesaler' as const, id: w.id })),
            ]
          : [{ type: 'Wholesaler' as const, id: 'LIST' }],
    }),

    // Approve / Reject wholesaler by ID (matches your API: PUT /wholesalers/{id}/approval)
    approveUser: builder.mutation<
      { message?: string }, // response type (adjust if your API returns different)
      { id: string; action: 'approve' | 'reject'; reason?: string }>({
      query: ({ id, action, reason }) => ({
        url: `wholesalers/${id}/approval`,
        method: 'PUT',
        body: { action, reason: reason ?? '' },
      }),
      // invalidate the list and that specific wholesaler so UI refreshes
      invalidatesTags: (result, error, arg) => [
        { type: 'Wholesaler', id: 'LIST' },
        { type: 'Wholesaler', id: arg.id },
      ],
      }),
    getRetailers: builder.query<Retailer[], void>({
      query: () => '/admin/retailers',
    }),
    getAdminProducts: builder.query<AdminProductsResponse, void>({
  query: () => "admin/products",
    }),
    // api/productsApi.ts (inside endpoints)
registerWholesaler: builder.mutation<
  WholesalerRegisterResponse,
  WholesalerRegisterRequest
>({
  query: (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("roleName", data.roleName);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("businessName", data.businessName);
    formData.append("taxNumber", data.taxNumber);
    formData.append("businessAddress", data.businessAddress);
    formData.append("businessLicenseNumber", data.businessLicenseNumber);
    formData.append("businessLicenseDocument", data.businessLicenseDocument);
    formData.append("taxCertificate", data.taxCertificate);

    return {
      url: "wholesalers/register",
      method: "POST",
      body: formData,
    };
  },
}),
 registerRetailer: builder.mutation<
      any,
      { name: string; email: string; password: string; phoneNumber: string; businessName: string }
    >({
      query: (body) => ({
        url: "/retailers/register",
        method: "POST",
        body,
      }),
    }),
 
    registerCustomer: builder.mutation<any, { 
      name: string; 
      email: string; 
      phoneNumber: string; 
      password: string; 
      roleName: "Customer"; 
    }>({
      query: (data) => ({
        url: "/auth/register/customer",
        method: "POST",
        body: data,
      }),
    }),
  }),
  
  
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useAdminLoginMutation,
  useGetAdminWholesalersQuery,
  useApproveUserMutation,
  useGetRetailersQuery,
  useGetAdminProductsQuery, useRegisterWholesalerMutation,
  useRegisterRetailerMutation,
  useRegisterCustomerMutation,useRetailerWholesalerLoginMutation
} = sokoLinkApi;
