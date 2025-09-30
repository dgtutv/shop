import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router";
import Shop from './pages/Shop.jsx'
import CartPage from './pages/Cart.jsx'
import Header from './layouts/Header.jsx';
//Link props
//CurrentLink prop
//Pass down to header
//Link class wth active property, URL, etc

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "shop",
    element: <Shop />,
  },
  {
    path: "cart",
    element: <CartPage />,
  },
]);

const contentStyle = {
  flex: 1,
}

const mainStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: "100vh",
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div style={mainStyle}>
      <Header/>
      <div style={contentStyle}>
        <RouterProvider router={router} />
      </div>
    </div>
  </StrictMode>
);