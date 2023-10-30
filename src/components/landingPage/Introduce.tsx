import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { layoutActions } from "../../store/layout/layoutSlice";
import { useNavigate } from "react-router-dom";

export default function Introduce() {
  const userInfo = useAppSelector((state) => state.auth.dataUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const navigateRegister = () => {
    dispatch(layoutActions.chooseAuthState("register"));
    navigate("/login");
  };
  return (
    <section id="intro" className="relative">
      <div className="bg-image-mockups absolute w-full h-[40%] md:h-[50%] bg-no-repeat lg:hidden"></div>
      {/* <div className="bg-header-desktop absolute w-full h-full bg-no-repeat hidden lg:block bg-left -right-42.6%"></div> */}
      {/* <div className="bg-image-mockups absolute z-20 w-full h-1/2 bg-no-repeat bg-top -top-12 md:-top-16 bg-custom-mobile-mockup-size lg:hidden"></div> */}
      <div className="container h-[70vh] md:h-screen relative z-20">
        <div className=" h-full flex flex-col justify-end pb-0 lg:w-96 lg:justify-center">
          <div className="h-[60%] md:h-1/2 flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
            <Typography variant="h1" className=" text-primary-dark-blue pb-5">
              Chất lượng vượt niềm tin
            </Typography>
            <p className="text-neutral-grayish-blue text-xs lg:text-base leading-5 mb-7">
              Công khai quy trình sản xuất, khẳng định chất lượng, nâng tầm
              thương hiệu của bạn ngay hôm nay.
            </p>
            {userInfo?.name ? (
              <></>
            ) : (
              <button
                onClick={navigateRegister}
                className="bg-primary-lime-green px-7 py-3 rounded-full text-neutral-white text-xs bg-gradient-to-r from-primary-lime-green to-primary-bright-cyan hover:button-brightness mb-2 focus:outline-none focus:ring ring-green-400"
              >
                Dùng thử ngay
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
