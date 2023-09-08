import React, { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/store";
import MembersTable from "./Members";
import { organizerActions } from "../../../store/organizer/info/organizerSlice";
import { Stack, Typography } from "@mui/material";
import CustomButton from "../../../components/share/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import { layoutActions } from "../../../store/layout/layoutSlice";

const MemberPage = () => {
  const dispatch = useAppDispatch();

  const openAddMemberModal = () => {
    dispatch(layoutActions.openModalAddMember());
  };
  useEffect(() => {
    dispatch(organizerActions.getDetailOrganizer());
  }, []);
  return (
    <Stack spacing={1} p={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h3" sx={{ fontWeight: 500 }}>
          Danh sách thành viên
        </Typography>
        <CustomButton
          Icon={<AddIcon />}
          color="primary"
          onClick={openAddMemberModal}
          label="Thêm thành viên"
        />
      </Stack>
      <MembersTable />
    </Stack>
  );
};

export default MemberPage;
