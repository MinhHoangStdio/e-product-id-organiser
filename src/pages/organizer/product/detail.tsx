import { useEffect, useState } from "react";
import { Typography, Grid, Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import ImageSlider from "../../../components/organizer/product/ImageSlider";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { productActions } from "../../../store/organizer/product/productSlice";
import { layoutActions } from "../../../store/layout/layoutSlice";
import CustomButton from "../../../components/share/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.detailProduct);
  const loadingSendRequest = useAppSelector(
    (state) => state.product.loadingRequestProduct
  );
  const [urlSelected, setUrlSelected] = useState<any>(product?.images?.[0]);

  const openConsignmentModal = () => {
    dispatch(layoutActions.openModalConsignment());
  };

  useEffect(() => {
    dispatch(productActions.getDetailProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.images) {
      setUrlSelected(product?.images[0]);
    }
  }, [product]);

  useEffect(() => {
    return () => {
      dispatch(productActions.resetDetailProduct());
    };
  }, []);

  return (
    (product && (
      <Grid sx={{ width: "100%" }} p={2} container columnSpacing={4}>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography variant="h3">Chi tiết sản phẩm </Typography>
        </Grid>
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
              <b>Tên sản phẩm:</b> {product?.name}
            </Typography>
            {product?.category && (
              <Typography sx={{ fontSize: "16px", mt: 1 }}>
                <b>Danh mục:</b> {product?.category.name}
              </Typography>
            )}
            <Typography sx={{ fontSize: "16px", mt: 1 }}>
              <b>Trạng thái sản phẩm:</b> {product?.approval_status}
            </Typography>
            <Typography sx={{ fontSize: "16px", mt: 1 }}>
              <b>Mô tả: </b>
              {product?.description}
            </Typography>
          </Box>
          <Stack gap={1}>
            <CustomButton
              width="150px"
              color="primary"
              onClick={openConsignmentModal}
              Icon={<AddIcon />}
              label="Tạo lô hàng"
            />
            {product?.approval_status == "pending" ? (
              <CustomButton
                width="220px"
                color="info"
                onClick={() => {
                  dispatch(productActions.requestProduct(product?.id));
                }}
                Icon={<AddIcon />}
                disabled={loadingSendRequest}
                label="Gửi yêu cầu phê duyệt"
              />
            ) : (
              <CustomButton
                width="250px"
                color="info"
                Icon={<CheckIcon />}
                disabled={true}
                label="Đã gửi yêu cầu phê duyệt"
              />
            )}
          </Stack>
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
