import { useEffect } from 'react';
import './App.css'
import Protected from './components/auth/Projected';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SignUpPage from './pages/SignUpPage';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { fetchItemsByUserIdAsync } from './components/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './components/auth/authSlice';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PageNotFound from './pages/PageNotFound';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './components/user/userSlice';
import LogoutPage from './pages/LogoutPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Logout from './components/auth/Logout';
import ProtectedAdmin from './admin/auth/ProtectedAdmin';
import AdminHome from './admin/pages/AdminHome';
import AdminProductDetailPage from './admin/pages/AdminProductDetailPage';
import AdminProductFormPage from './admin/pages/AdminProductFormPage';
import AdminOrdersPage from './admin/pages/AdminOrdersPage';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};



const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected> <HomePage /></Protected> ,
    // loader: <h1>Home Loader</h1>,
    // children: [
    //   {
    //     path: "login",
    //     element: <Login />,
    //     loader: <h1>Login Loader</h1>,
    //   },
    // ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin >
        <AdminHome />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element:<LoginPage />
  },
  {
    path: "/sign-up",
    element: <SignUpPage />
  },
  {
    path: "/cart",
    element:<Protected><CartPage /></Protected> ,
  },
  {
    path: "/product-detail/:id",
    element: <Protected> <ProductDetailPage /> </Protected> ,
  },
  {
    path: "/checkout",
    element: <Protected> <CheckoutPage /> </Protected> ,
  },
  {
    path: "/order-success/:id",
    element: <Protected> <OrderSuccessPage /> </Protected> ,
  },
  
  {
    path: "/profile",
    element: <Protected><UserProfilePage /> </Protected> ,
  },
  {
    path: '/orders',
    element: (
      <Protected>
      <UserOrdersPage />
      </Protected>
      // we will add Page later right now using component directly.
    ),
  },
  {
    path: '/logout',
    element: (
      <Protected>
      <Logout />
      </Protected>
      // we will add Page later right now using component directly.
    ),
  },
  {
    path: '/forgot-password',
    element: (<ForgotPasswordPage />
      // we will add Page later right now using component directly.
    ),
  },
  {
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage /> 
      </ProtectedAdmin>
    ),
  },
  {
    path: "*",
    element: <Protected> <PageNotFound /> </Protected> ,
  },
]);


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id))

    }
  }, [dispatch, user])

  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
      <RouterProvider router={router} />
      </Provider>
    </div>
  )
}

export default App
