import { Box, Paper, Typography, useTheme } from "@mui/material";
import Navbar from "../../components/layout/Navbar";
import SidebarCustom from "../../components/layout/Sidebar";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import CreateAndEditProductModal from "../../components/modal/product/CreateAndEditProduct";
import LoadingOverLay from "../../components/LoadingOverLay";
import { colorToken } from "../../theme/colorToken";
import ConfirmModal from "../../components/modal/ConfirmModal";
import CreateConsignmentModal from "../../components/modal/consignment/CreateConsignment";
import CreateChainsModal from "../../components/modal/chains/CreateChainsModal";
import { useEffect } from "react";
import { organizerActions } from "../../store/organizer/info/organizerSlice";
import CreateOrganizerModal from "../../components/modal/organizer/CreateOrganizerModal";
import Breadcrumb from "../../components/BreadCrumb";
import AddMember from "../../components/modal/AddMember";
import Footer from "../../components/landingPage/Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const isCollapseSidebar = useAppSelector(
    (state) => state.layout.isCollapseSidebar
  );

  //test theme
  const mode = useAppSelector((state) => state.layout.theme);
  const colors = colorToken(mode);

  return (
    <>
      <SidebarCustom />
      <main
        className="content"
        style={
          !isCollapseSidebar
            ? { paddingLeft: "250px", transition: "padding 0.3s ease" }
            : { paddingLeft: "80px", transition: "padding 0.3s ease" }
        }
      >
        {/* <Navbar /> */}
        <Box sx={{ px: 4, pb: 2, pt: 3, bgcolor: colors.background.main }}>
          <Breadcrumb />
          <Paper sx={{ minHeight: "90vh" }}>{children}</Paper>
          <Typography variant="body2" sx={{ mt: 1, color: "#5f5f5f" }}>
            © E-Product ID. Đã đăng ký bản quyền. Dự án được xây dựng bởi Stdio
            Team.
          </Typography>
          {/* <Typography variant="body2">
            
          </Typography> */}
        </Box>
        {/* <Footer /> */}
        <CreateOrganizerModal />
        <CreateAndEditProductModal />
        <CreateConsignmentModal />
        <CreateChainsModal />
        <ConfirmModal />
        <AddMember />
        <LoadingOverLay />
      </main>
    </>
  );
};
export default MainLayout;
