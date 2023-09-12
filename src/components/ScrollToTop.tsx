import { useEffect, useState } from "react";
import { getScroll } from "../utils/getWindow";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = (event: any) => {
    const offsetFromTop = getScroll(event.target, true);

    if (!showScroll && offsetFromTop > 350) {
      setShowScroll(true);
    } else if (offsetFromTop <= 350) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollUp = () => {
    const element = document.getElementById("intro") as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  return (
    <>
      <div id="intro"></div>
      {showScroll ? (
        <div
          onClick={scrollUp}
          style={{
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "100px",
            position: "fixed",
            bottom: "30px",
            right: "30px",
            backgroundColor: "#cccccc4d",
            cursor: "pointer",
          }}
        >
          <VerticalAlignTopIcon />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ScrollToTop;
