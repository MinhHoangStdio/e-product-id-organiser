import { Grid, Pagination, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { layoutActions } from "../../../store/layout/layoutSlice";
import ProductCard from "../../../components/organizer/product/ProductCard";
import { useEffect, useState } from "react";
import CustomButton from "../../../components/share/CustomButton";
import { ParamsModalConfirm } from "../../../types/modal";
import { modalActions } from "../../../store/modal/modalSlice";
import { totalPagePagination } from "../../../utils/pagination";
import AddIcon from "@mui/icons-material/Add";
import { consignmentActions } from "../../../store/organizer/consignment/consignmentSlice";
import { Consignment } from "../../../types/consignment";

const ConsignmentPage = () => {
  const [params, setParams] = useState({ limit: 8, page: 1 });
  const dispatch = useAppDispatch();
  const { listConsignments, loadingGetConsignments, pagination } =
    useAppSelector((state) => state.consignment);

  const openProductModal = () => {
    dispatch(layoutActions.openModalProduct());
  };
  const openConsignmentModal = () => {
    dispatch(layoutActions.openModalConsignment());
  };

  const confirmDelete = (data: Consignment) => {
    const params: ParamsModalConfirm = {
      title: "Confirm",
      content: (
        <span>
          Do you want to delete a consignment<b> "{data.name}"</b>?
        </span>
      ),
      onAction: () => dispatch(consignmentActions.removeConsignment(data.id)),
      buttonText: "Delete",
    };
    dispatch(modalActions.showModal(params));
  };

  const handlePagination = (e: any, value: number) => {
    setParams((prevState) => {
      return { ...prevState, page: value };
    });
  };

  useEffect(() => {
    dispatch(consignmentActions.getListConsignments({}));
  }, [dispatch, params]);

  return (
    <Grid sx={{ p: 2 }} container>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3">Your Consignments</Typography>

          <CustomButton
            Icon={<AddIcon />}
            color="primary"
            onClick={openProductModal}
            label="Create a new product"
          />
        </Stack>
      </Grid>
      {listConsignments.length ? (
        listConsignments.map((cons) => (
          <Grid sx={{ mt: 2, px: 1 }} item xs={3} key={cons.id}>
            <ProductCard
              img=""
              productName={cons.name}
              description={cons.description}
              onAction={() => {
                dispatch(consignmentActions.selectedConsignment(cons));
                dispatch(layoutActions.openModalChains());
              }}
              labelAction="Create A Chain"
              onDelete={() => confirmDelete(cons)}
            />
          </Grid>
        ))
      ) : (
        <></>
      )}
      <Grid item xs={12}>
        <Stack sx={{ py: "20px" }}>
          <Pagination
            count={pagination ? totalPagePagination(pagination) : 1}
            page={pagination?.page || 1}
            onChange={handlePagination}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ConsignmentPage;
