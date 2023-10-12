import { Stack, Typography } from "@mui/material";
import StatisticsItemBase from "../StatisticsItemBase";
import { useAppSelector } from "../../../hooks/store";

export default function MemberStatistic() {
  const statisticMember = useAppSelector(
    (state) => state.dashboard.statistic?.member_count
  );

  return (
    <StatisticsItemBase
      title="Tổng thành viên"
      quantity={statisticMember as number}
    />
  );
}
