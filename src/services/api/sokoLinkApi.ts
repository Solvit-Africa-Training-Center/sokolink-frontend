// api/productsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  ApiResponse,
  Product,
  ProductListResponse,
  CreateProductRequest,
  AdminLoginRequest,
  AdminLoginResponse,User
} from '../../types';

export const sokoLinkApi = createApi({
  reducerPath: 'productsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['Product'],
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: false,
  keepUnusedDataFor: 60,

  endpoints: (builder) => ({
    // GET all products
    getProducts: builder.query<ApiResponse<ProductListResponse>, void>({
      query: () => 'products',
      providesTags: ['Product'],
    }),

    // GET single product by ID
    getProductById: builder.query<ApiResponse<Product>, any>({
      query: (productId) => `products/${productId}`,
      providesTags:['Product'],
    }),

    // CREATE a new product
    createProduct: builder.mutation<ApiResponse<Product>, CreateProductRequest>({
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
    })

   
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useAdminLoginMutation
} = sokoLinkApi;
