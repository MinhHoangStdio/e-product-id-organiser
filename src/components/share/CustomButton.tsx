import { Button, IconButton } from "@mui/material";
import { colorToken } from "../../theme/colorToken";
import { useAppSelector } from "../../hooks/store";
type ICustomButton = {
  fullWidth?: boolean;
  width?: string;
  height?: string;
  color: "primary" | "error" | "info" | "success";
  size?: "large" | "small" | "medium";
  disabled?: boolean;
  onClick?: () => void;
  label: string;
  type?: "submit" | "button";
  Icon?: any;
};

const CustomButton = ({
  fullWidth,
  color,
  disabled,
  onClick,
  label,
  size = "large",
  type = "button",
  Icon,
  width,
  height,
}: ICustomButton) => {
  const mode = useAppSelector((state) => state.layout.theme);
  const colors = colorToken(mode);

  return label ? (
    <Button
      variant="contained"
      sx={
        width
          ? {
              bgcolor: `${colors.button[color]} !important`,
              textTransform: "none !important",
              width: width,
              height: height ? height : "",
              cursor: disabled ? "not-allowed !important" : "pointer",
              color: "#fff",
              "&.Mui-disabled": {
                color: "#c0c0c0",
              },
            }
          : {
              bgcolor: `${colors.button[color]} !important`,
              textTransform: "none !important",
              cursor: disabled ? "not-allowed  !important" : "pointer",
              color: "#fff",
              height: height ? height : "",
              "&.Mui-disabled": {
                color: "#c0c0c0",
              },
            }
      }
      size={size}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick ? onClick() : console.log("clicked");
      }}
      type={type}
      startIcon={Icon ? Icon : null}
      fullWidth={fullWidth}
    >
      {label}
    </Button>
  ) : (
    <IconButton
      sx={{
        bgcolor: `${colors.button[color]} !important`,
        textTransform: "none !important",
        color: "#fff",
        width: width ? width : "",
        height: height ? height : "",
        "&.Mui-disabled": {
          background: "#eaeaea",
          color: "#c0c0c0",
        },
      }}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {Icon}
    </IconButton>
  );
};

export default CustomButton;
