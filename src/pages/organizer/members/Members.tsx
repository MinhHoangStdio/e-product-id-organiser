import { useState, useEffect, useMemo } from "react";
import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Stack,
  SortDirection,
  Checkbox,
} from "@mui/material";
import OrderTableHead from "../../../components/table/OrderTableHead";

// icon
import CancelIcon from "@mui/icons-material/Cancel";

// empty
import Empty from "../../../components/table/Empty";
import { HeadCell } from "../../../types/table";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { checkAllCondition, handleCheckAll } from "../../../utils/table";
import { Member } from "../../../types/organizer";
import { ParamsModalConfirm } from "../../../types/modal";
import { organizerActions } from "../../../store/organizer/info/organizerSlice";
import { modalActions } from "../../../store/modal/modalSlice";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import LoadingPage from "../../../components/LoadingPage";

export default function MembersTable() {
  const dispatch = useAppDispatch();
  const listMemberOrganizer = useAppSelector(
    (state) => state.organizer.detailOrganizer.list_member
  );
  const organizerDetail = useAppSelector(
    (state) => state.organizer.detailOrganizer
  );
  const loadingGetOrganizerMembers = useAppSelector(
    (state) => state.organizer.loadingGetDetailOrganizer
  );
  const ownerOrganizerId = useAppSelector(
    (state) => state.organizer.userOrganizer?.owner_id
  );
  const userId = useAppSelector((state) => state.auth.dataUser?.id);

  const [listChecked, setListChecked] = useState<any[]>([]);
  const isCheckAll = useMemo(
    () => checkAllCondition(listMemberOrganizer, listChecked),
    [listMemberOrganizer, listChecked]
  );
  const handleChecked = (e: any) => {
    const id = Number(e.target.value);
    const tmpList = [...listChecked];
    //check xem id đã tồn tại trong listChecked chưa, nếu có sẽ trả về giá trị >-1
    const index = tmpList.indexOf(id);
    //handle toggle selected
    if (index > -1) {
      tmpList.splice(index, 1);
    } else {
      tmpList.push(id);
    }
    setListChecked(tmpList);
  };
  const resetChecked = () => {
    setListChecked([]);
  };

  const [order] = useState("asc");
  const [orderBy] = useState("trackingNo");

  const confirmDelete = (data: Member) => {
    const params: ParamsModalConfirm = {
      title: "Xác nhận",
      content: (
        <span>
          Bạn có chắc chắc muốn xóa thành viên <b>"{data.name}"</b> không ?
        </span>
      ),
      onAction: () => dispatch(organizerActions.removeMember([data.id])),
      buttonText: "Xóa",
    };
    dispatch(modalActions.showModal(params));
  };

  const headCells: HeadCell[] = [
    {
      id: "checkbox",
      align: "left",
      disablePadding: false,
      label: "",
      width: "40px",
    },
    {
      id: "memberId",
      align: "left",
      disablePadding: false,
      label: "ID",
      fontSize: "15px",
    },
    {
      id: "memberName",
      align: "left",
      disablePadding: false,
      label: "Tên thành viên",
      fontSize: "15px",
    },
    {
      id: "email",
      align: "left",
      disablePadding: false,
      label: "Email",
      fontSize: "15px",
    },
    {
      id: "role",
      align: "left",
      disablePadding: false,
      label: "Chức vụ",
      fontSize: "15px",
    },
    {
      id: "action",
      align: "center",
      disablePadding: false,
      label: "Hành động",
      fontSize: "15px",
      paddingLeft: "25px",
    },
  ];

  function Row({ row }: { row: Member }) {
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row" align="left">
            <Checkbox
              color="secondary"
              value={row?.id}
              checked={listChecked?.includes(row?.id)}
              onChange={handleChecked}
            />
          </TableCell>
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
              minWidth: 150,
              maxWidth: 150,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.email}
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
            {row.id === ownerOrganizerId ? "Người sáng lập" : "Thành viên"}
          </TableCell>
          <TableCell align="left" className="table-cell">
            <Box>
              {userId !== ownerOrganizerId ? (
                <Stack direction="row" spacing={1} justifyContent="center">
                  <IconButton disabled>
                    <DoDisturbIcon fontSize="medium" />
                  </IconButton>
                </Stack>
              ) : row.id === userId ? (
                <Stack direction="row" spacing={1} justifyContent="center">
                  <IconButton disabled>
                    <DoDisturbIcon fontSize="medium" />
                  </IconButton>
                </Stack>
              ) : (
                <Stack direction="row" spacing={1} justifyContent="center">
                  <IconButton
                    sx={{ marginLeft: "0px" }}
                    aria-label="delete"
                    onClick={(e) => {
                      confirmDelete(row);
                    }}
                    color="error"
                  >
                    <CancelIcon fontSize="medium" />
                  </IconButton>
                </Stack>
              )}
            </Box>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  useEffect(() => {
    resetChecked();
  }, [listMemberOrganizer]);

  return (
    <Box>
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
          <OrderTableHead
            headCells={headCells}
            order={order as SortDirection | undefined}
            orderBy={orderBy}
            checked={isCheckAll}
            handleCheckAll={() =>
              handleCheckAll(listMemberOrganizer, listChecked, setListChecked)
            }
          />

          {!organizerDetail?.id || loadingGetOrganizerMembers ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={12} scope="full" align="center">
                  <LoadingPage />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : listMemberOrganizer?.length ? (
            <TableBody>
              {listMemberOrganizer.map((item, index) => (
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
