import { Breadcrumbs, Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { toCamelCase } from "../utils/string/toCamelCase";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs sx={{ fontSize: 14 }}>
      <Link to="/">
        {" "}
        <HomeIcon sx={{ mr: 0.5, mt: "-3px" }} fontSize="inherit" />
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <span style={{ color: "#000" }} key={name}>
            {toCamelCase(name)}
          </span>
        ) : (
          <Link key={name} to={routeTo}>
            {toCamelCase(name)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
