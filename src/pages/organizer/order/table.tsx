import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Stack,
  Typography,
} from "@mui/material";

// icon
import { HeadCell } from "../../../types/table";
import Empty from "../../../components/table/Empty";
import { Order } from "../../../types/order";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import OrderTableHead from "../../../components/table/OrderTableHead";
import OrderStatus from "../../../components/organizer/order/OrderStatus";
import { Link } from "react-router-dom";

export default function OrdersTable() {
  const dispatch = useAppDispatch();
  const listOrders = useAppSelector((state) => state.order.listOrders);

  const headCells: HeadCell[] = [
    {
      id: "orderId",
      align: "left",
      disablePadding: false,
      label: "ID",
      fontSize: "15px",
    },
    {
      id: "customerName",
      align: "left",
      disablePadding: false,
      label: "Tên khách hàng",
      fontSize: "15px",
    },
    {
      id: "productName",
      align: "left",
      disablePadding: false,
      label: "Tên sản phẩm",
      fontSize: "15px",
    },
    {
      id: "consignmentName",
      align: "left",
      disablePadding: false,
      label: "Tên lô hàng",
      fontSize: "15px",
    },
    {
      id: "status",
      align: "center",
      disablePadding: false,
      label: "Trạng thái",
      fontSize: "15px",
    },
    {
      id: "createdTime",
      align: "center",
      disablePadding: false,
      label: "Thời gian tạo",
      fontSize: "15px",
    },
    {
      id: "action",
      align: "center",
      disablePadding: false,
      label: "",
      fontSize: "15px",
      paddingLeft: "25px",
    },
  ];

  function Row({ row }: { row: Order }) {
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell align="left" className="table-cell">
            {row.id}
          </TableCell>

          <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 150,
              maxWidth: 150,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.name}
          </TableCell>

          <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 200,
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row?.product?.name}
          </TableCell>

          <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 200,
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row?.consignment?.name}
          </TableCell>
          <TableCell
            align="center"
            className="table-cell"
            sx={{
              minWidth: 200,
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <OrderStatus status={row.status} />
          </TableCell>

          <TableCell
            align="center"
            className="table-cell"
            sx={{
              minWidth: 200,
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.created_at}
          </TableCell>

          <TableCell align="left" className="table-cell">
            <Box>
              <Stack direction="row" justifyContent="center">
                <Link to={`/organizer/orders/${row.id}`}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#00B3D5",
                      mt: 1,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Chi tiết
                  </Typography>
                </Link>
              </Stack>
            </Box>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <Box p={1}>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead headCells={headCells} />

          {listOrders?.length ? (
            <TableBody>
              {listOrders.map((item, index) => (
                <Row key={index} row={item} />
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={12} scope="full" align="center">
                  <Empty title="Không có dữ liệu" height="400px" />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
