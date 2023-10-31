import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Stack,
  Chip,
  Grid,
  Link,
  CircularProgress,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { Chain } from "../../types/chain";
import { convertDateMui } from "../../utils/convertDate";
import { publicConsignmentActions } from "../../store/public/consignment/consignmentSlice";
import ImageSlider from "../../components/organizer/product/ImageSlider";
import Navbar from "../../components/landingPage/Navbar";
import Footer from "../../components/landingPage/Footer";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";
import { layoutActions } from "../../store/layout/layoutSlice";

const PublicConsignment = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isFetchedData = useAppSelector(
    (state) => state.publicConsignment.isFetchedData
  );
  const consignment = useAppSelector(
    (state) => state.publicConsignment.consignmentDetail
  );
  const organizerInfo = useAppSelector(
    (state) => state.publicConsignment.publicOrganizer
  );
  const product = consignment?.product;
  const chains = consignment?.chains;
  const [urlSelected, setUrlSelected] = useState<any>(product?.images?.[0]);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const openRepurchaseModal = () => {
    dispatch(layoutActions.openModalRepurchase());
  };

  useEffect(() => {
    dispatch(publicConsignmentActions.getConsignmentDetail(id));
    return () => {
      dispatch(publicConsignmentActions.resetPublicConsignment());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.images) {
      setUrlSelected(product?.images[0]);
    }
  }, [consignment, product]);

  return isFetchedData ? (
    <>
      <ScrollToTopOnMount />
      <Navbar />
      <Box
        sx={{
          background: "#f4f4f4",
          px: {
            xs: 2,
            sm: 6,
            md: 10,
            lg: 16,
          },
        }}
        py={2}
      >
        {product && (
          <Box sx={{ pt: "64px" }}>
            <Grid
              sx={{
                width: "100%",
                background: "white",
                borderRadius: "20px",
                p: {
                  xs: 1,
                },
              }}
              container
            >
              <Grid
                item
                xs={12}
                sm={6}
                paddingLeft={0}
                py={2}
                sx={{ px: { xs: 0, sm: 1 } }}
              >
                <ImageSlider
                  imagesUrl={product?.images || []}
                  urlSelected={urlSelected}
                  setSelected={setUrlSelected}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ px: { xs: 3, sm: 1 } }} py={2}>
                <Box>
                  <Typography variant="h2">{product?.name}</Typography>
                  <Typography sx={{ fontSize: "14px", marginTop: "20px" }}>
                    <b>Tên sản phẩm:</b> {product?.name}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", mt: 1 }}>
                    <b>Danh mục:</b> {product?.category?.name}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", mt: 1 }}>
                    <b>Mô tả sản phẩm:</b>
                  </Typography>
                  {(product?.description &&
                    (product?.description.length <= 500 ||
                    showFullDescription ? (
                      <p>{product?.description}</p>
                    ) : (
                      <>
                        {" "}
                        <p>
                          {product?.description.slice(0, 500)}...{" "}
                          <Link
                            component="button"
                            variant="body1"
                            onClick={toggleDescription}
                          >
                            Xem thêm
                          </Link>
                        </p>
                      </>
                    ))) ||
                    ""}

                  {product?.payload &&
                    Object.entries(product.payload).map(
                      ([key, value]: [string, any]) => (
                        <Typography sx={{ fontSize: "14px", mt: 1 }} key={key}>
                          <b>{key}:</b> {value}
                        </Typography>
                      )
                    )}
                  <Button
                    onClick={openRepurchaseModal}
                    variant="contained"
                    color="primary"
                    style={{
                      marginTop: "20px",
                      width: "100%",
                      padding: "10px 20px",
                      backgroundColor: "green",
                    }}
                  >
                    Mua lại
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}

        {(consignment && organizerInfo ? (
          <Grid container sx={{ mt: 1 }} spacing={3}>
            <Grid item xs={12} md={5}>
              <Box
                p={3}
                sx={{
                  background: "white",
                  borderRadius: "20px",
                  height: "100%",
                }}
              >
                <Typography variant="h2">Thông tin tổ chức</Typography>
                <Typography sx={{ fontSize: "14px", mt: 1 }}>
                  <b>Tên tổ chức:</b> {organizerInfo.name}
                </Typography>
                <Typography sx={{ fontSize: "14px", mt: 1 }}>
                  <b>Người sáng lập:</b> {organizerInfo.owner.name}
                </Typography>
                <Typography sx={{ fontSize: "14px", mt: 1 }}>
                  <b>Số lượng thành viên:</b> {organizerInfo.member_count}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box p={3} sx={{ background: "white", borderRadius: "20px" }}>
                <Typography variant="h2">Thông tin lô hàng</Typography>
                <Typography sx={{ fontSize: "14px", mt: 1 }}>
                  <b>Tên lô hàng:</b> {consignment.name}
                </Typography>
                <Typography sx={{ fontSize: "14px", mt: 1 }}>
                  <b>Số lượng:</b> {consignment.amount}
                </Typography>
                <Typography sx={{ fontSize: "14px", mt: 1 }}>
                  <b>Mô tả:</b> {consignment?.description}
                </Typography>
                {/* <Typography sx={{ fontSize: "14px", mt: 1 }}>
              <b>Trạng thái:</b>{" "}
              {consignment?.is_sold_out ? "Hết hàng" : "Còn hàng"}
            </Typography> */}
                {consignment?.payload &&
                  Object.entries(consignment.payload).map(
                    ([key, value]: [string, any]) => (
                      <Typography sx={{ fontSize: "14px", mt: 1 }} key={key}>
                        <b>{key}:</b> {value}
                      </Typography>
                    )
                  )}
              </Box>
            </Grid>
          </Grid>
        ) : (
          <></>
        )) || (
          <Typography variant="h2" paddingTop={"64px"} textAlign={"center"}>
            Sản phẩm không hợp lệ
          </Typography>
        )}

        {(chains?.length || "") && (
          <Box mt={4} sx={{ background: "white", borderRadius: "20px" }}>
            <Typography variant="h2" pl={3} pt={3}>
              Thông tin công đoạn
            </Typography>
            {chains?.map((chain: Chain, index: any) => (
              <Box p={3} key={index} pt={0}>
                <Stack mt={1} direction="row" gap={1} alignItems="center">
                  <Typography variant="h3">
                    {index + 1 + ". "} {chain.name}
                  </Typography>
                  {chain?.date_start && (
                    <Chip label={convertDateMui(chain?.date_start)} />
                  )}
                </Stack>
                <Typography sx={{ fontSize: "14px", mt: 1 }}>
                  {chain?.description || ""}
                </Typography>
                {chain?.payload &&
                  Object.entries(chain.payload).map(
                    ([key, value]: [string, any]) => (
                      <Typography sx={{ fontSize: "14px", mt: 1 }} key={key}>
                        <b>{key}:</b> {value}
                      </Typography>
                    )
                  )}
                {(chain?.images?.length || "") && (
                  <Stack
                    sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
                    direction="row"
                    gap={1}
                    alignItems="center"
                    mt={2}
                    flexWrap={"wrap"}
                  >
                    {chain.images?.map((image: string, index: any) => (
                      <img
                        src={image}
                        alt="Product image"
                        style={{
                          height: 300,
                          objectFit: "cover",
                          // marginTop: "20px",
                        }}
                        key={index}
                      />
                    ))}
                  </Stack>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Footer />
    </>
  ) : (
    <div
      style={{
        zIndex: 9999,
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress
        sx={{
          position: "relative",
          top: "50%",
          transform: "translateY(-50%)",
        }}
        color="secondary"
      />
    </div>
  );
};

export default PublicConsignment;
