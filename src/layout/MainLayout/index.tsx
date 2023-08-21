import { Box, Paper, useTheme } from "@mui/material";
import Navbar from "../../components/layout/Navbar";
import SidebarCustom from "../../components/layout/Sidebar";
import { useAppSelector } from "../../hooks/store";
import CreateAndEditProductModal from "../../components/modal/product/CreateAndEditProduct";
import LoadingOverLay from "../../components/LoadingOverLay";
import { colorToken } from "../../theme/colorToken";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
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
            ? { marginLeft: "250px", transition: "margin 0.3s ease" }
            : { marginLeft: "80px", transition: "margin 0.3s ease" }
        }
      >
        <Navbar />
        <Box sx={{ px: 4, pb: 4, bgcolor: colors.background.main }}>
          <Paper sx={{ minHeight: "85vh" }}>{children}</Paper>
        </Box>
        <CreateAndEditProductModal />
        <LoadingOverLay />
      </main>
    </>
  );
};
export default MainLayout;
