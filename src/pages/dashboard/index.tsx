import { Grid, Typography } from "@mui/material";
import EmptyOrganizer from "../../components/organizer/EmptyOrganizer";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { layoutActions } from "../../store/layout/layoutSlice";
import StatisticsItem from "../../components/dashboard/StatisticsItemBase";
import ProductStatistic from "../../components/dashboard/ProductStatistic";
import { useEffect } from "react";
import { dashboardAction } from "../../store/dashboard/dashboardSlice";
import ConsignmentStatistic from "../../components/dashboard/ConsignmentStatistic";
import MemberStatistic from "../../components/dashboard/MemberStatistic";
const InfoPage = () => {
  const dispatch = useAppDispatch();
  const organizer = useAppSelector((state) => state.organizer.userOrganizer);
  const openOrganizerModal = () => {
    dispatch(layoutActions.openModalOrganizer());
  };

  useEffect(() => {
    dispatch(dashboardAction.getConsignmentStatistic(organizer?.id));
    dispatch(dashboardAction.getProductStatistic(organizer?.id));
    dispatch(dashboardAction.getMemberStatistic(organizer?.id));
  }, [dispatch, organizer?.id]);

  return organizer?.id ? (
    <Grid sx={{ p: 1 }} container>
      <Grid item xs={12}></Grid>
      <Grid sx={{ p: 1 }} item xs={4}>
        <ProductStatistic />
      </Grid>
      <Grid sx={{ p: 1 }} item xs={4}>
        <ConsignmentStatistic />
      </Grid>
      <Grid sx={{ p: 1 }} item xs={4}>
        <MemberStatistic />
      </Grid>
    </Grid>
  ) : (
    <EmptyOrganizer onAction={openOrganizerModal} labelBtn="Tạo tổ chức" />
  );
};

export default InfoPage;
