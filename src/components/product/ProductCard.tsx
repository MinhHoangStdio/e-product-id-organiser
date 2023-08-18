import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

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
  onEdit,
  onDelete,
  onDetail,
}: IProductCard) => {
  return (
    <Card>
      <CardMedia sx={{ height: 250 }} image={img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" color="warning" onClick={onDetail}>
          Detail
        </Button>
        <Button variant="outlined" color="primary" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="outlined" color="error" onClick={onDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
