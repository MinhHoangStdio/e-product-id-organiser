import { Button, IconButton } from "@mui/material";
import { colorToken } from "../../theme/colorToken";
import { useAppSelector } from "../../hooks/store";
type ICustomButton = {
  fullWidth?: boolean;
  width?: string;
  color: "primary" | "error" | "info";
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
            }
          : {
              bgcolor: `${colors.button[color]} !important`,
              textTransform: "none !important",
            }
      }
      size={size}
      disabled={disabled}
      onClick={onClick}
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
