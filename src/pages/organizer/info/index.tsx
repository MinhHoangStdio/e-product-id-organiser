import { Stack, Typography } from "@mui/material";
import EmptyOrganizer from "../../../components/organizer/EmptyOrganizer";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { layoutActions } from "../../../store/layout/layoutSlice";
const OrganizerInfo = () => {
  const dispatch = useAppDispatch();
  const organizer = useAppSelector((state) => state.organizer.userOrganizer);
  const openOrganizerModal = () => {
    dispatch(layoutActions.openModalOrganizer());
  };

  return organizer?.id ? (
    <Stack p={2}>
      <Typography variant="h2">{organizer.name}</Typography>
    </Stack>
  ) : (
    <EmptyOrganizer onAction={openOrganizerModal} labelBtn="Tạo tổ chức" />
  );
};

export default OrganizerInfo;
