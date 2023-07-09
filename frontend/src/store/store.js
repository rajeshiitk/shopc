import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../components/cart/cartSlice'
import productsSlice from '../components/product/productsSlice'
import authSlice from '../components/auth/authSlice'
import orderSlice from '../components/order/orderSlice'
import userSlice from '../components/user/userSlice'
export const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productsSlice,
    auth: authSlice,
    order: orderSlice,
    user: userSlice,
  },
})