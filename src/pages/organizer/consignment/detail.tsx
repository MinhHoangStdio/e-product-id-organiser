import { useEffect, useState } from "react";
import { Typography, Grid, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { consignmentActions } from "../../../store/organizer/consignment/consignmentSlice";

const ConsignmentDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const consignment = useAppSelector(
    (state) => state.consignment.consignmentDetail
  );
  const product = consignment?.product;
  const chains = consignment?.chains;
  const [urlSelected, setUrlSelected] = useState<any>(product?.images?.[0]);

  useEffect(() => {
    dispatch(consignmentActions.getConsignmentDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.images) {
      setUrlSelected(product?.images[0]);
    }
  }, [consignment, product]);

  return (
    <>
      {(consignment && (
        <Box p={4}>
          <Typography variant="h1">Consignment Information</Typography>
          <Typography sx={{ fontSize: "16px", mt: 1 }}>
            <b>Consignment name:</b> {consignment.name}
          </Typography>
          <Typography sx={{ fontSize: "16px", mt: 1 }}>
            <b>Amount:</b> {consignment.amount}
          </Typography>
          <Typography sx={{ fontSize: "16px", mt: 1 }}>
            <b>Description:</b> {consignment?.description}
          </Typography>
          <Typography sx={{ fontSize: "16px", mt: 1 }}>
            <b>Status:</b> {consignment?.is_sold_out ? "Sold out" : "In stock"}
          </Typography>
        </Box>
      )) || (
        <Typography variant="h2" paddingTop={"25px"} textAlign={"center"}>
          Consignment not found.
        </Typography>
      )}
      {product && (
        <Grid
          sx={{ width: "100%", alignItems: "center" }}
          p={4}
          container
          columnSpacing={4}
        >
          <Grid item xs={4}>
            <img
              src={product?.images.length && product?.images[0]}
              alt="Product image"
              style={{
                height: 400,
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Typography variant="h3">{product?.name}</Typography>
              <Typography variant="h4">
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
            </Box>
          </Grid>
        </Grid>
      )}

      {(chains?.length || "") && (
        <>
          <Typography variant="h2" pl={4}>
            List chains
          </Typography>
          {chains?.map((chain, index) => (
            <Box p={4} key={index} pt={0}>
              <Typography sx={{ fontSize: "18px", marginTop: "20px" }}>
                <b>
                  {index + 1 + ". "} {chain.name}
                </b>
              </Typography>
              <Typography sx={{ fontSize: "16px", mt: 1 }}>
                {chain.description}
              </Typography>

              {(chain?.images?.length || "") && (
                <Box
                  display={"flex"}
                  justifyContent={"space-around"}
                  overflow={"hidden"}
                  mt={2}
                >
                  {chain.images?.map((image, index) => (
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
                </Box>
              )}
            </Box>
          ))}
        </>
      )}
    </>
  );
};

export default ConsignmentDetail;
