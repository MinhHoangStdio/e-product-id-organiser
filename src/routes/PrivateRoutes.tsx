import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";
import ConsignmentPage from "../pages/organizer/consignment";

const PrivateRoutes = () => {
  const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));
  const Product = Loadable(lazy(() => import("../pages/organizer/product")));
  const OrganizerInfo = Loadable(lazy(() => import("../pages/organizer/info")));
  const ProductDetail = Loadable(
    lazy(() => import("../pages/organizer/product/detail"))
  );
  const ConsignmentDetail = Loadable(
    lazy(() => import("../pages/organizer/consignment/detail"))
  );
  const ChangePwd = Loadable(lazy(() => import("../pages/profile/ChangePwd")));
  return (
    <MainLayout>
      <Routes>
        <Route path="/*" element={<Navigate to="/organizer/products" />} />
        <Route path="/login" element={<Navigate to="/organizer/products" />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/organizer/products" element={<Product />} />
        {/* <Route path="/organizer/info" element={<OrganizerInfo />} /> */}
        <Route path="/organizer/products/:id" element={<ProductDetail />} />
        <Route path="/organizer/consignments" element={<ConsignmentPage />} />
        <Route
          path="/organizer/consignments/:id"
          element={<ConsignmentDetail />}
        />
        <Route path="/profile/changepwd" element={<ChangePwd />} />
      </Routes>
    </MainLayout>
  );
};

export default PrivateRoutes;
