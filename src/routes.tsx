import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/HomePage";
import Movie from "./pages/MoviePage";
import TvSeries from "./pages/TvSeriesPage";
import SignUp from "./pages/SignUpPage";
import Profile from "./pages/ProfilePage";
import { AuthProvider } from "./AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import Faq from "./pages/FaqPage";
import PackagePage from "./pages/PackagePage";
import WizardzPage from "./pages/landings/wizardz";
import AboutUsPage from "./pages/AboutUs";
import UpcomingPage from "./pages/UpcomingPage";
import ReferralPage from "./pages/ReferralPage";
import LoginPage from "./pages/LoginPage";
import ServicesPage from "./pages/ServicesPage";
import ErrorPage from "./pages/ErrorPage";
import BookmarkPage from "./pages/BookmarkPage";
import ProductPage from "./pages/sales/ProductPage";
import CartPage from "./pages/sales/CartPage";
import CheckoutPage from "./pages/sales/CheckoutPage";
import ProductDetailPage from "./pages/sales/ProductDetailPage";
import AddListingPage from "./pages/admin/AddListing";
import ProductListPage from "./pages/admin/ProductListPage";
import SubscribleListPage from "./pages/admin/SubscribleListPage";
import ContactUsListPage from "./pages/admin/ContactUsListPage";
import SalesList from "./pages/admin/SalesList";

// Layout component that specifies the default error element
const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use the Layout as the top-level route element
    errorElement: <ErrorPage />, // Set a default error element here
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/movies", element: <Movie /> },
      { path: "/tv-series", element: <TvSeries /> },
      { path: "/bookmarks", element: <BookmarkPage /> },
      { path: "/about-us", element: <AboutUsPage /> },
      { path: "/faq", element: <Faq /> },
      { path: "/referral", element: <ReferralPage /> },
      { path: "/package", element: <PackagePage /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/upcoming-movies", element: <UpcomingPage /> },
      { path: "/product", element: <ProductPage /> },
      { path: "product/:productCode", element: <ProductDetailPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/admin/add-listing", element: <AddListingPage /> },
      { path: "/admin/product-list", element: <ProductListPage /> },
      { path: "/admin/subscrible-list", element: <SubscribleListPage /> },
      { path: "/admin/sales-list", element: <SalesList /> },
      { path: "/admin/contact-us-list", element: <ContactUsListPage /> },
      { path: "/wizardz", element: <WizardzPage /> },
      {
        path: "/member/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default AppRouter;
