// api/productsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  ApiResponse,
  Product,
  ProductListResponse,
  GetProductsParams,
  CreateProductRequest,
  UpdateProductRequest
} from '../../types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.yourdomain.com/v1/',
    prepareHeaders: (headers) => {
      // Add auth token if needed
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Product'], // For cache invalidation
  endpoints: (builder) => ({
    
    // GET all products with optional filters
    getProducts: builder.query<ApiResponse<ProductListResponse>, GetProductsParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        
        if (params.page) searchParams.append('page', params.page.toString());
        if (params.limit) searchParams.append('limit', params.limit.toString());
        if (params.category) searchParams.append('category', params.category);
        if (params.minPrice) searchParams.append('minPrice', params.minPrice.toString());
        if (params.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());
        if (params.search) searchParams.append('search', params.search);
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);
        
        return `products?${searchParams.toString()}`;
      },
      providesTags: ['Product'],
    }),
    
    // GET single product by ID
    getProductById: builder.query<ApiResponse<Product>, string>({
      query: (productId) => `products/${productId}`,
      providesTags: (result, error, productId) => 
        [{ type: 'Product', id: productId }],
    }),
    
    // CREATE a new product
    createProduct: builder.mutation<ApiResponse<Product>, CreateProductRequest>({
      query: (newProduct) => ({
        url: 'products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Product'], // Refresh product list after creation
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
        'Product', // Also invalidate the list
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
    
    // GET products by user (seller)
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

// Export hooks for usage in components
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