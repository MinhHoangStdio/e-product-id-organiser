import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { themeSettings } from "./theme";
import { getAuth } from "./utils/auth";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import ScrollToTop from "./components/ScrollToTop";
import { useLocation } from "react-router-dom";
import { organizerActions } from "./store/organizer/info/organizerSlice";

const App = () => {
  const mode = useAppSelector((state) => state.layout.theme);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = getAuth();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const organizer = useAppSelector((state) => state.organizer.userOrganizer);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      location.pathname !== "/login" &&
      location.pathname !== "/introduce" &&
      location.pathname !== "/forgot-password" &&
      !location.pathname.includes("/public/consignments") &&
      !organizer?.id
    ) {
      dispatch(organizerActions.getOrganizer());
    }
    // toast.warning("Vui lòng đăng nhập để tiếp tục", {
    //   position: toast.POSITION.TOP_CENTER,
    //   autoClose: 500,
    // });
  }, [location.pathname]);

  return (
    <div className="app">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ScrollToTop />
          {isAuth && isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />}
          <ToastContainer limit={3} autoClose={3000} />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default App;
