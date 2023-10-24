import { useCallback, useEffect, useState } from "react";
import { organizerActions } from "../../../store/organizer/info/organizerSlice";
import { Box, MenuItem, Pagination, Stack, TextField } from "@mui/material";
import CustomButton from "../../../components/share/CustomButton";
import { layoutActions } from "../../../store/layout/layoutSlice";
import EmptyOrganizer from "../../../components/organizer/EmptyOrganizer";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import OrdersTable from "./table";
import { totalPagePagination } from "../../../utils/pagination";
import { orderActions } from "../../../store/organizer/order/orderSlice";
import { EOrderStatus } from "../../../types/enum/order";

const OrderPage = () => {
  const dispatch = useAppDispatch();
  const organizer = useAppSelector((state) => state.organizer.userOrganizer);
  const { listOrders, loadingListOrders, pagination } = useAppSelector(
    (state) => state.order
  );
  const [params, setParams] = useState<{
    limit: number;
    page: number;
    name?: string;
  }>({ limit: 8, page: 1 });

  const [orderStatusLabel, setOrderStatus] = useState("");
  const [listStatus] = useState([
    { label: "Chưa xử lý", value: EOrderStatus.Pending },
    { label: "Đã hoàn thành", value: EOrderStatus.Completed },
  ]);
  const resetParams = useCallback(() => {
    setParams({ limit: 8, page: 1 });
    setOrderStatus("");
  }, []);

  const openOrganizerModal = () => {
    dispatch(layoutActions.openModalOrganizer());
  };

  const handlePagination = (e: any, value: number) => {
    setParams((prevState) => {
      return { ...prevState, page: value };
    });
  };

  useEffect(() => {
    if (organizer?.id) {
      dispatch(organizerActions.getDetailOrganizer());
    }
  }, [organizer]);

  useEffect(() => {
    if (organizer?.id) {
      dispatch(orderActions.getListOrder(params));
    }
  }, [dispatch, params, organizer]);

  return organizer?.id ? (
    <>
      <Box
        sx={{
          padding: "20px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <TextField
            sx={{ minWidth: "220px" }}
            variant="outlined"
            select
            id="product-status"
            label="Trạng thái"
            value={orderStatusLabel}
            InputLabelProps={{ shrink: !!orderStatusLabel }}
            onChange={(e: any) => {
              setParams((prevState) => ({
                ...prevState,
                status: e.target.value,
                page: 1,
              }));
              setOrderStatus(e.target.value);
            }}
          >
            {listStatus.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </TextField>
          <CustomButton
            color="error"
            onClick={resetParams}
            label="Xóa bộ lọc"
            disabled={!orderStatusLabel}
          />
        </Stack>
      </Box>
      <OrdersTable />
      <Box sx={{ py: "20px" }}>
        <Pagination
          count={pagination ? totalPagePagination(pagination) : 1}
          page={pagination?.page || 1}
          onChange={handlePagination}
        />
      </Box>
    </>
  ) : (
    <EmptyOrganizer onAction={openOrganizerModal} labelBtn="Tạo tổ chức" />
  );
};

export default OrderPage;
