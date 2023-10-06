import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import ProductStatus from "../organizer/product/ProductStatus";
import { EApprovalStatus } from "../../types/enum/product";

type StatisticsItemProps = {
  title: string;
  quantity: number;
  BodyContent?: React.ReactElement;
};

export default function StatisticsItemBase({
  title,
  quantity,
  BodyContent,
}: StatisticsItemProps) {
  return (
    <Paper
      sx={{
        width: "100%",
        minHeight: "150px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        bgcolor: "#f7fdfe",
        p: 2,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h3" fontWeight={600}>
          {title}:
        </Typography>
        <Typography variant="h3" fontWeight={600}>
          {quantity}
        </Typography>
      </Stack>
      <Box sx={{ overflow: "auto", height: "120px" }}>{BodyContent}</Box>
    </Paper>
  );
}
