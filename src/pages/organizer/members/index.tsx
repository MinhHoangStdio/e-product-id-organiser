import React, { useEffect } from "react";
import MembersTable from "./Members";
import { organizerActions } from "../../../store/organizer/info/organizerSlice";
import { Stack, Typography } from "@mui/material";
import CustomButton from "../../../components/share/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import { layoutActions } from "../../../store/layout/layoutSlice";
import EmptyOrganizer from "../../../components/organizer/EmptyOrganizer";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";

const MemberPage = () => {
  const dispatch = useAppDispatch();
  const organizer = useAppSelector((state) => state.organizer.userOrganizer);

  const openAddMemberModal = () => {
    dispatch(layoutActions.openModalAddMember());
  };
  const openOrganizerModal = () => {
    dispatch(layoutActions.openModalOrganizer());
  };
  useEffect(() => {
    if (organizer?.id) {
      dispatch(organizerActions.getDetailOrganizer());
    }
  }, [organizer]);
  return organizer?.id ? (
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
  ) : (
    <EmptyOrganizer onAction={openOrganizerModal} labelBtn="Tạo tổ chức" />
  );
};

export default MemberPage;
