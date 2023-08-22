import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout";
import ConsignmentPage from "../pages/organizer/consignment";

const PrivateRoutes = () => {
  const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));
  const Product = Loadable(lazy(() => import("../pages/organizer/product")));
  return (
    <MainLayout>
      <Routes>
        <Route path="/*" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organizer/products" element={<Product />} />
        <Route path="/organizer/consignments" element={<ConsignmentPage />} />
      </Routes>
    </MainLayout>
  );
};

export default PrivateRoutes;
