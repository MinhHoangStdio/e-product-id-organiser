import { useState } from "react";
import logoLanding from "../../assets/landingPage/logoLanding.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { layoutActions } from "../../store/layout/layoutSlice";

const navItems = [
  { label: "Trang chủ", to: "/introduce#" },
  { label: "Giới thiệu", to: "/introduce#about" },
  { label: "Sản phẩm nổi bật", to: "/introduce#products" },
];

export default function Navbar() {
  const location = useLocation();
  const userInfo = useAppSelector((state) => state.auth.dataUser);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClosePopup = () => {
    setIsOpen(false);
  };
  const handleNavigateLogin = () => {
    dispatch(layoutActions.chooseAuthState("login"));
    navigate("/login");
  };
  const handleNavigateProfile = () => {
    navigate("/organizer/products");
  };
  return (
    <>
      <div className="fixed z-50 top-0 w-full bg-white">
        <nav className="container flex justify-between items-center z-20">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/introduce")}
            width={150}
            src={logoLanding}
            alt="logo"
          />
          {location.pathname.includes("/introduce") ? (
            <div className="hidden lg:block text-sm text-neutral-grayish-blue">
              {navItems.map((navItem) => (
                <a
                  key={navItem.label}
                  className="mx-3 py-5 hover:gradient-border-bottom"
                  href={navItem.to}
                >
                  {navItem.label}
                </a>
              ))}
              <a
                href="https://stdiohue.com/"
                target="_blank"
                className="mx-3 py-5 hover:gradient-border-bottom"
              >
                Liên lạc
              </a>
            </div>
          ) : (
            <></>
          )}

          {userInfo?.name ? (
            <button
              onClick={handleNavigateProfile}
              className="hidden lg:block bg-primary-lime-green px-7 py-3 rounded-full text-neutral-white text-xs bg-gradient-to-r from-primary-lime-green to-primary-bright-cyan hover:button-brightness focus:outline-none focus:ring ring-green-400"
            >
              {userInfo.name}
            </button>
          ) : (
            <button
              onClick={handleNavigateLogin}
              className="hidden lg:block bg-primary-lime-green px-7 py-3 rounded-full text-neutral-white text-xs bg-gradient-to-r from-primary-lime-green to-primary-bright-cyan hover:button-brightness focus:outline-none focus:ring ring-green-400"
            >
              Đăng nhập
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden focus:outline-none "
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>
      </div>

      {/* Modal */}
      <div
        className={`fixed inset-0 z-30 bg-gray-800 
      bg-opacity-50 ${isOpen ? "block" : "hidden"}`}
      >
        <div className="bg-white text-primary-dark-blue flex flex-col items-center mx-5 my-20 py-4 rounded">
          {location.pathname.includes("/introduce") ? (
            <>
              {navItems.map((navItem) => (
                <a
                  onClick={handleClosePopup}
                  key={navItem.label}
                  className="py-2"
                  href={navItem.to}
                >
                  {navItem.label}
                </a>
              ))}
              <a
                onClick={handleClosePopup}
                className="py-2"
                href="https://stdiohue.com/"
                target="_blank"
              >
                Liên lạc
              </a>
            </>
          ) : (
            <Link className="py-2" to="/introduce">
              Trang chủ
            </Link>
          )}
          {userInfo?.name ? (
            <button
              onClick={handleNavigateProfile}
              className="mt-1 w-[50%] bg-primary-lime-green px-7 py-3 rounded-full text-neutral-white text-xs bg-gradient-to-r from-primary-lime-green to-primary-bright-cyan hover:button-brightness focus:outline-none focus:ring ring-green-400"
            >
              {userInfo.name}
            </button>
          ) : (
            <button
              onClick={handleNavigateLogin}
              className="mt-1 w-[50%] bg-primary-lime-green px-7 py-3 rounded-full text-neutral-white text-xs bg-gradient-to-r from-primary-lime-green to-primary-bright-cyan hover:button-brightness focus:outline-none focus:ring ring-green-400"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </>
  );
}
