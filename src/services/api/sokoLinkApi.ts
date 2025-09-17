// api/productsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  ApiResponse,
  Product,
  ProductListResponse,
  CreateProductRequest,
  UpdateProductRequest,
} from '../../types';

export const productsApi = createApi({
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
      providesTags: (result, error, productId) => [
        { type: 'Product', id: productId },
      ],
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

    // UPDATE a product
    updateProduct: builder.mutation<ApiResponse<Product>, UpdateProductRequest>({
      query: ({ productId, ...updates }) => ({
        url: `products/${productId}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Product', id: productId },
        'Product',
      ],
    }),

    // DELETE a product
    deleteProduct: builder.mutation<ApiResponse<{ message: string }>, string>({
      query: (productId) => ({
        url: `products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    // GET products by category
    getProductsByCategory: builder.query<ApiResponse<ProductListResponse>, string>({
      query: (categoryId) => `products/category/${categoryId}`,
      providesTags: ['Product'],
    }),

    // GET products by user
    getProductsByUser: builder.query<ApiResponse<ProductListResponse>, string>({
      query: (userId) => `products/user/${userId}`,
      providesTags: ['Product'],
    }),

    // SEARCH products
    searchProducts: builder.query<ApiResponse<ProductListResponse>, string>({
      query: (searchTerm) => `products/search?q=${encodeURIComponent(searchTerm)}`,
      providesTags: ['Product'],
    }),
  }),
});

//Export hooks
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsByCategoryQuery,
  useGetProductsByUserQuery,
  useSearchProductsQuery,
} = productsApi;
