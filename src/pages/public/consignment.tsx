import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Stack,
  Chip,
  Grid,
  Link,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { Chain } from "../../types/chain";
import { convertDateMui } from "../../utils/convertDate";
import { publicConsignmentActions } from "../../store/public/consignment/consignmentSlice";
import ImageSlider from "../../components/organizer/product/ImageSlider";

const PublicConsignment = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isFetchedData = useAppSelector(
    (state) => state.publicConsignment.isFetchedData
  );
  const consignment = useAppSelector(
    (state) => state.publicConsignment.consignmentDetail
  );
  const product = consignment?.product;
  const chains = consignment?.chains;
  const [urlSelected, setUrlSelected] = useState<any>(product?.images?.[0]);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    dispatch(publicConsignmentActions.getConsignmentDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.images) {
      setUrlSelected(product?.images[0]);
    }
  }, [consignment, product]);

  console.log("cons", consignment);
  return isFetchedData ? (
    <Box px={20} sx={{ background: "#f4f4f4" }} py={2}>
      {product && (
        <Grid
          ml={0}
          sx={{ width: "100%", background: "white", borderRadius: "20px" }}
          p={4}
          container
          columnSpacing={4}
        >
          <Grid item xs={5}>
            <ImageSlider
              imagesUrl={product?.images || []}
              urlSelected={urlSelected}
              setSelected={setUrlSelected}
            />
          </Grid>
          <Grid item xs={7}>
            <Box>
              <Typography variant="h2">{product?.name}</Typography>
              <Typography sx={{ fontSize: "14px", marginTop: "20px" }}>
                <b>Tên sản phẩm:</b> {product?.name}
              </Typography>
              <Typography sx={{ fontSize: "14px", mt: 1 }}>
                <b>Danh mục:</b> {product?.category.name}
              </Typography>
              <Typography sx={{ fontSize: "14px", mt: 1 }}>
                <b>Mô tả sản phẩm:</b>
              </Typography>
              {(product?.description &&
                (product?.description.length <= 500 || showFullDescription ? (
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
            </Box>
          </Grid>
        </Grid>
      )}

      {(consignment && (
        <Box p={4} mt={5} sx={{ background: "white", borderRadius: "20px" }}>
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
          <Typography sx={{ fontSize: "14px", mt: 1 }}>
            <b>Trạng thái:</b>{" "}
            {consignment?.is_sold_out ? "Hết hàng" : "Còn hàng"}
          </Typography>
          {consignment?.payload &&
            Object.entries(consignment.payload).map(
              ([key, value]: [string, any]) => (
                <Typography sx={{ fontSize: "14px", mt: 1 }} key={key}>
                  <b>{key}:</b> {value}
                </Typography>
              )
            )}
        </Box>
      )) || (
        <Typography variant="h2" paddingTop={"25px"} textAlign={"center"}>
          Sản phẩm không hợp lệ
        </Typography>
      )}

      {(chains?.length || "") && (
        <Box mt={5} sx={{ background: "white", borderRadius: "20px" }}>
          <Typography variant="h2" pl={4} pt={3}>
            Thông tin công đoạn
          </Typography>
          {chains?.map((chain: Chain, index: any) => (
            <Box p={4} key={index} pt={0}>
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
              {chain?.images?.length && (
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  gap={1}
                  alignItems="center"
                  mt={2}
                >
                  {chain.images?.map((image: string, index: any) => (
                    <img
                      src={image}
                      alt="Product image"
                      style={{
                        height: 300,
                        objectFit: "cover",
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