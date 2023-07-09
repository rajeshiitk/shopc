import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchAllProducts, fetchProductsByFilter,fetchBrands,fetchCategories,fetchProductById, updateProduct, createProduct} from './productApi';

const initialState = {
  products: [],
  brands:[],
  categories:[],
  selectedProduct:{},
  status: 'idle',
  totalItems:0,
}

export const fetchAllProductsAsync = createAsyncThunk(
    'products/fetchAllProducts',
    async (amount) => {
      const response = await fetchAllProducts(amount);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );


  
export const fetchProductByIdAsync = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const fetchProductsByFilterAsync = createAsyncThunk(
    'products/fetchProductsByFilter',
    async ({filter, sort,pagination,admin}) => {
      const response = await fetchProductsByFilter(filter,sort,pagination ,admin);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );


  export const fetchBrandsAsync = createAsyncThunk(
    'products/fetchBrands',
    async () => {
      const response = await fetchBrands();
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );
  export const fetchCategoriesAsync = createAsyncThunk(
    'products/fetchCategories',
    async () => {
      const response = await fetchCategories();
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );


  
export const createProductAsync = createAsyncThunk(
  'product/create',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/update',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct:(state)=>{
      state.selectedProduct = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      }).addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
})

// Action creators are generated for each case reducer function
export const {clearSelectedProduct } = productsSlice.actions
export const selectAllProducts = (state) => state.products.products;
export const selectBrands = (state) => state.products.brands;
export const selectCategories = (state) => state.products.categories;
export const selectProductById = (state) => state.products.selectedProduct;


export const selectTotalItems = (state) => state.products.totalItems;
export const selectProductListStatus = (state) => state.products.status;
export default productsSlice.reducer