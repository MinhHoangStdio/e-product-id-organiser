import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import CustomButton from "../../share/CustomButton";

type IProductCard = {
  img: string;
  productName: string;
  description: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onDetail?: () => void;
};

const ProductCard = ({
  img,
  productName,
  description,
  onEdit = () => {
    console.log("edit");
  },
  onDelete = () => {
    console.log("delete");
  },
  onDetail = () => {
    console.log("detail");
  },
}: IProductCard) => {
  return (
    <Card>
      <CardMedia sx={{ height: 250 }} image={img} />
      <CardContent>
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {productName}
        </Typography>
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          variant="body2"
          color="text.secondary"
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <CustomButton color="info" onClick={onDetail} label="Detail" />

        <CustomButton color="primary" onClick={onEdit} label="Edit" />

        <CustomButton color="error" onClick={onDelete} label="Delete" />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
