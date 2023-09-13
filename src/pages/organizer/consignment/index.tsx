import {
  Box,
  Grid,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { layoutActions } from "../../../store/layout/layoutSlice";
import ProductCard from "../../../components/organizer/product/ProductCard";
import { useCallback, useEffect, useState } from "react";
import CustomButton from "../../../components/share/CustomButton";
import { ParamsModalConfirm } from "../../../types/modal";
import { modalActions } from "../../../store/modal/modalSlice";
import { totalPagePagination } from "../../../utils/pagination";
import AddIcon from "@mui/icons-material/Add";
import { consignmentActions } from "../../../store/organizer/consignment/consignmentSlice";
import { Consignment } from "../../../types/consignment";
import history from "../../../routes/history";
import { productActions } from "../../../store/organizer/product/productSlice";
import EmptyOrganizer from "../../../components/organizer/EmptyOrganizer";
import LoadingPage from "../../../components/LoadingPage";
import { debounceSearch } from "../../../utils/debounceSearch";
import SearchIcon from "@mui/icons-material/Search";

const ConsignmentPage = () => {
  const [params, setParams] = useState<{
    limit: number;
    page: number;
    name?: string;
  }>({ limit: 8, page: 1 });
  const [searchConsignment, setSearchConsignment] = useState("");
  const dispatch = useAppDispatch();
  const {
    listConsignments,
    loadingGetConsignments,
    pagination,
    isFetchConsignments,
  } = useAppSelector((state) => state.consignment);
  const organizer = useAppSelector((state) => state.organizer.userOrganizer);

  const debounceSearchListConsignments = useCallback(debounceSearch, []);

  const handleSearchConsignment = (value: string) => {
    setSearchConsignment(value);
    debounceSearchListConsignments(value.trim(), setParams);
  };

  const openConsignmentModal = () => {
    dispatch(layoutActions.openModalConsignment());
  };

  const openOrganizerModal = () => {
    dispatch(layoutActions.openModalOrganizer());
  };

  const confirmDelete = (data: Consignment) => {
    const params: ParamsModalConfirm = {
      title: "Xác nhận",
      content: (
        <span>
          Bạn có chắc chắn muốn xóa lô hàng<b> "{data.name}"</b>?
        </span>
      ),
      onAction: () => dispatch(consignmentActions.removeConsignment(data.id)),
      buttonText: "Xóa",
    };
    dispatch(modalActions.showModal(params));
  };

  const handlePagination = (e: any, value: number) => {
    setParams((prevState) => {
      return { ...prevState, page: value };
    });
  };

  useEffect(() => {
    if (organizer?.id) {
      dispatch(consignmentActions.getListConsignments(params));
    } else {
      dispatch(consignmentActions.userNoHaveOrganizer());
    }
  }, [dispatch, params, organizer]);

  useEffect(() => {
    if (organizer?.id) {
      dispatch(productActions.getAllListProducts());
    }
  }, [dispatch, organizer]);

  useEffect(() => {
    dispatch(productActions.resetDetailProduct());
  }, []);

  return !isFetchConsignments ? (
    <LoadingPage />
  ) : organizer?.id ? (
    <Stack sx={{ minHeight: "85vh" }} justifyContent="space-between">
      <Grid sx={{ p: 2 }} container>
        {listConsignments ? (
          <>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h3" sx={{ fontWeight: 500 }}>
                    Danh sách lô hàng
                  </Typography>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ width: "250px" }}
                    placeholder="Tìm kiếm lô hàng"
                    size="small"
                    value={searchConsignment}
                    onChange={(e) => handleSearchConsignment(e.target.value)}
                  />
                </Stack>

                <CustomButton
                  Icon={<AddIcon />}
                  color="primary"
                  onClick={openConsignmentModal}
                  label="Tạo lô hàng mới"
                />
              </Stack>
            </Grid>

            {loadingGetConsignments ? (
              <LoadingPage />
            ) : listConsignments?.length ? (
              listConsignments.map((cons) => (
                <>
                  <Grid sx={{ mt: 2, px: 1 }} item xs={3} key={cons.id}>
                    <ProductCard
                      img={cons?.product?.images[0]}
                      name={cons?.name}
                      amount={cons?.amount}
                      productName={
                        cons?.product?.name ? cons?.product?.name : "Chưa đặt"
                      }
                      description={cons?.description}
                      onAction={() => {
                        dispatch(consignmentActions.selectedConsignment(cons));
                        dispatch(layoutActions.openModalChains());
                      }}
                      labelAction="Create Chains"
                      onDelete={() => confirmDelete(cons)}
                      onClick={() => {
                        history.push("/organizer/consignments/" + cons.id);
                      }}
                    />
                  </Grid>
                </>
              ))
            ) : (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%", height: "80vh", color: "#7e7e7e" }}
              >
                <p>Không tìm thấy lô hàng</p>
              </Stack>
            )}
          </>
        ) : (
          <EmptyOrganizer
            onAction={openConsignmentModal}
            labelBtn="Tạo lô hàng"
          />
        )}
      </Grid>
      {listConsignments?.length ? (
        <Box sx={{ py: "20px" }}>
          <Pagination
            count={pagination ? totalPagePagination(pagination) : 1}
            page={pagination?.page || 1}
            onChange={handlePagination}
          />
        </Box>
      ) : (
        <></>
      )}
    </Stack>
  ) : (
    <EmptyOrganizer onAction={openOrganizerModal} labelBtn="Tạo tổ chức" />
  );
};

export default ConsignmentPage;
