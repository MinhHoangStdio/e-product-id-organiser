import { Stack } from "@mui/material";
import Introduce from "../../components/landingPage/Introduce";
import Motivation from "../../components/landingPage/Motivation";
import HighlightedProducts from "../../components/landingPage/HighlightedProducts";
import Navbar from "../../components/landingPage/Navbar";
import Footer from "../../components/landingPage/Footer";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";

const Home = () => {
  return (
    <>
      <ScrollToTopOnMount />
      <Navbar />
      <div className="relative overflow-hidden pt-[65px]">
        <Stack direction="row" justifyContent="center">
          <div>
            <Introduce />
          </div>
          <div className="hidden lg:block bg-no-repeat bg-image-mockups w-[100%] bg-cover"></div>
        </Stack>

        <Motivation />
      </div>
      <HighlightedProducts />
      <Footer />
    </>
  );
};

export default Home;
