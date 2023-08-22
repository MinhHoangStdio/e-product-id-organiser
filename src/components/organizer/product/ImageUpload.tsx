import { IconButton, Stack } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface IImage {
  src: any;
  alt?: string;
  onDelete?: () => void;
  width?: any;
}

const ImageUpload = ({ src, alt, onDelete, width }: IImage) => {
  return (
    <Stack
      justifyContent="center"
      sx={{
        width: width ? width : "180px",
        height: "200px",
        background: "black",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <IconButton
        onClick={onDelete}
        sx={{
          position: "absolute",
          top: "0px",
          right: "0px",
          color: "white",
        }}
      >
        <HighlightOffIcon />
      </IconButton>
      <img style={{ width: "100%" }} src={src} alt={alt} />
    </Stack>
  );
};

export default ImageUpload;
