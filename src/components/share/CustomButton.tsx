import { Button } from "@mui/material";
import { colorToken } from "../../theme/colorToken";
import { useAppSelector } from "../../hooks/store";
type ICustomButton = {
  fullWidth?: boolean;
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
}: ICustomButton) => {
  const mode = useAppSelector((state) => state.layout.theme);
  const colors = colorToken(mode);

  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: `${colors.button[color]} !important`,
        textTransform: "none !important",
      }}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      startIcon={Icon ? Icon : null}
      fullWidth={fullWidth}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
