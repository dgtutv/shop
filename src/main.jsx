import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Shop from './pages/Shop.jsx'
import CartPage from './pages/Cart.jsx'
import Layout from './layouts/Layout.jsx';
import { ThemeProvider } from './contexts/ThemeProvider.jsx';
import { CartProvider } from './contexts/CartProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Shop />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ThemeProvider>
  </StrictMode>
);
