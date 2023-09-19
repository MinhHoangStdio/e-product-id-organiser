import { useEffect, useState } from "react";
import { Typography, Grid, Box, Stack, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import ImageSlider from "../../../components/organizer/product/ImageSlider";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { productActions } from "../../../store/organizer/product/productSlice";
import { layoutActions } from "../../../store/layout/layoutSlice";
import CustomButton from "../../../components/share/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import TextDetail from "../../../components/organizer/product/TextDetail";
import { toUpperFirstLetter } from "../../../utils/string/toUpperFirstLetter";
import LoadingPage from "../../../components/LoadingPage";
import ProductStatus from "../../../components/organizer/product/ProductStatus";
import { EApprovalStatus } from "../../../types/enum/product";

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

  return product ? (
    product.name ? (
      <Grid sx={{ width: "100%" }} p={2} container columnSpacing={4}>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 500 }}>
            Thông tin sản phẩm
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <ImageSlider
            imagesUrl={product?.images || []}
            urlSelected={urlSelected}
            setSelected={setUrlSelected}
          />
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={3}>
              <Typography variant="h3" sx={{ fontWeight: 600 }}>
                {product.name}
              </Typography>
              {product?.approval_status !== EApprovalStatus.Ban ? (
                <CustomButton
                  size="medium"
                  width="150px"
                  color="primary"
                  onClick={openConsignmentModal}
                  Icon={<AddIcon />}
                  label="Tạo lô hàng"
                />
              ) : (
                <></>
              )}
            </Stack>

            <Stack spacing={2} sx={{ mt: 3 }}>
              <TextDetail label="Mô tả sản phẩm" value={product?.description} />
              <Divider />
              <Stack spacing={1}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 500, color: "#4b4b4b" }}
                >
                  Trạng thái sản phẩm
                </Typography>
                <ProductStatus
                  status={product?.approval_status as EApprovalStatus}
                />
                <Stack gap={1}>
                  {product?.approval_status == "approved" ||
                  product?.approval_status == EApprovalStatus.Ban ? (
                    <></>
                  ) : product?.approval_status == "pending" ? (
                    <CustomButton
                      size="small"
                      width="220px"
                      color="info"
                      onClick={() => {
                        dispatch(productActions.requestProduct(product?.id));
                      }}
                      Icon={<AddIcon />}
                      disabled={loadingSendRequest}
                      label="Gửi yêu cầu phê duyệt"
                    />
                  ) : product?.approval_status == EApprovalStatus.Reject ? (
                    <CustomButton
                      size="small"
                      width="220px"
                      color="info"
                      onClick={() => {
                        dispatch(productActions.requestProduct(product?.id));
                      }}
                      Icon={<AddIcon />}
                      disabled={loadingSendRequest}
                      label="Gửi yêu cầu phê duyệt lại"
                    />
                  ) : (
                    <CustomButton
                      size="small"
                      width="250px"
                      color="success"
                      Icon={<CheckIcon />}
                      disabled={true}
                      label="Đã gửi yêu cầu phê duyệt"
                    />
                  )}
                </Stack>
              </Stack>
              <Divider />
              <Stack spacing={1}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 500, color: "#4b4b4b" }}
                >
                  Chi tiết
                </Typography>
                <Typography variant="h6" sx={{ color: "#767676" }}>
                  <b>Danh mục:</b>{" "}
                  {product?.category?.name
                    ? product?.category?.name
                    : "Chưa xác định"}
                </Typography>
                <Typography variant="h6" sx={{ color: "#767676" }}>
                  <b>Số lượng lô hàng:</b>{" "}
                  {product?.category?.name ? product?.consignment_count : 0}
                </Typography>
                {product?.payload ? (
                  Object.keys(product?.payload).length ? (
                    Object.keys(product?.payload).map((key) => (
                      <Typography
                        key={key}
                        variant="h6"
                        sx={{ color: "#767676" }}
                      >
                        <b>{`${toUpperFirstLetter(key)}: `}</b>
                        {`${product?.payload[key]}`}
                      </Typography>
                    ))
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    ) : (
      <LoadingPage />
    )
  ) : (
    <Typography variant="h2" paddingTop={"25px"} textAlign={"center"}>
      Product not found.
    </Typography>
  );
};

export default ProductDetail;
