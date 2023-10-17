import { Box, Grid, Typography } from "@mui/material";
import EmptyOrganizer from "../../components/organizer/EmptyOrganizer";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { layoutActions } from "../../store/layout/layoutSlice";
import ProductStatistic from "../../components/dashboard/ProductStatistic";
import { useEffect } from "react";
import { dashboardAction } from "../../store/dashboard/dashboardSlice";
import ConsignmentStatistic from "../../components/dashboard/ConsignmentStatistic";
import MemberStatistic from "../../components/dashboard/MemberStatistic";
import ProductStatisticsPieChart from "../../components/chart/ProductStatisticsPieChart";

const InfoPage = () => {
  const dispatch = useAppDispatch();
  const organizer = useAppSelector((state) => state.organizer.userOrganizer);
  const openOrganizerModal = () => {
    dispatch(layoutActions.openModalOrganizer());
  };

  useEffect(() => {
    dispatch(dashboardAction.getStatistic(organizer?.id));
  }, [dispatch, organizer?.id]);

  return organizer?.id ? (
    <Grid sx={{ p: 1 }} container>
      <Grid item xs={12}></Grid>

      <Grid sx={{ p: 1, mb: 2 }} item xs={6}>
        <Box p={4} border={"2px solid skyblue"} borderRadius={"5px"}>
          <Typography mb={5} variant="h3">
            Sản phẩm
          </Typography>
          <ProductStatisticsPieChart />
        </Box>
      </Grid>
      <Grid item xs={6}></Grid>

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
