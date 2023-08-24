import { useEffect, useState } from "react";
import { Typography, Grid, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ImageSlider from "../../../components/organizer/product/ImageSlider";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { productActions } from "../../../store/organizer/product/productSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.detailProduct);
  const [urlSelected, setUrlSelected] = useState<any>(product?.images?.[0]);

  useEffect(() => {
    dispatch(productActions.getDetailProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.images) {
      setUrlSelected(product?.images[0]);
    }
  }, [product]);

  return (
    (product && (
      <Grid sx={{ width: "100%" }} p={4} container columnSpacing={4}>
        <Grid item xs={4}>
          <ImageSlider
            imagesUrl={product?.images || []}
            urlSelected={urlSelected}
            setSelected={setUrlSelected}
          />
        </Grid>
        <Grid item xs={8}>
          <Box>
            <Typography variant="h2">{product.name}</Typography>
            <Typography variant="h3">
              {product?.price?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
            <Typography sx={{ fontSize: "16px", marginTop: "20px" }}>
              <b>Product name:</b> {product?.name}
            </Typography>
            <Typography sx={{ fontSize: "16px", mt: 1 }}>
              <b>Category:</b> {product?.category.name}
            </Typography>
            <Typography sx={{ fontSize: "16px", mt: 1 }}>
              <b>Approval status:</b> {product?.approval_status}
            </Typography>
            <Typography sx={{ fontSize: "16px", mt: 1 }}>
              <b>Description:</b> <br />
              {product?.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    )) || (
      <Typography variant="h2" paddingTop={"25px"} textAlign={"center"}>
        Product not found.
      </Typography>
    )
  );
};

export default ProductDetail;
