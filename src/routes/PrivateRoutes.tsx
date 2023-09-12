import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";
import ConsignmentPage from "../pages/organizer/consignment";
import MinimalLayout from "../layout/MinimalLayout";

const PrivateRoutes = () => {
  const LandingPage = Loadable(
    lazy(() => import("../pages/public/LandingPage"))
  );
  const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));
  const Product = Loadable(lazy(() => import("../pages/organizer/product")));
  const OrganizerInfo = Loadable(lazy(() => import("../pages/organizer/info")));
  const Members = Loadable(lazy(() => import("../pages/organizer/members")));
  const ProductDetail = Loadable(
    lazy(() => import("../pages/organizer/product/detail"))
  );
  const ConsignmentDetail = Loadable(
    lazy(() => import("../pages/organizer/consignment/detail"))
  );
  const ChangePwd = Loadable(lazy(() => import("../pages/profile/ChangePwd")));

  const PublicConsignment = Loadable(
    lazy(() => import("../pages/public/consignment"))
  );
  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/organizer/products" />} />
      <Route path="/login" element={<Navigate to="/organizer/products" />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      <Route
        path="/organizer/products"
        element={
          <MainLayout>
            <Product />
          </MainLayout>
        }
      />

      <Route
        path="/organizer/members"
        element={
          <MainLayout>
            <Members />
          </MainLayout>
        }
      />
      <Route
        path="/organizer/products/:id"
        element={
          <MainLayout>
            <ProductDetail />
          </MainLayout>
        }
      />
      <Route
        path="/organizer/consignments"
        element={
          <MainLayout>
            <ConsignmentPage />
          </MainLayout>
        }
      />
      <Route
        path="/organizer/consignments/:id"
        element={
          <MainLayout>
            <ConsignmentDetail />
          </MainLayout>
        }
      />
      <Route
        path="/profile/changepwd"
        element={
          <MainLayout>
            <ChangePwd />
          </MainLayout>
        }
      />

      <Route
        path="/public/consignments/:id"
        element={
          <MinimalLayout>
            <PublicConsignment />
          </MinimalLayout>
        }
      />
      <Route
        path="/introduce"
        element={
          <MinimalLayout>
            <LandingPage />
          </MinimalLayout>
        }
      />
    </Routes>
  );
};

export default PrivateRoutes;
