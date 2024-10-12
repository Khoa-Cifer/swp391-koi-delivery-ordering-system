import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const ReportCard = ({
  title,
  value,
  description,
  icon,
  color,
  textColor,
  trend,
}) => {
  return (
    <Card style={{ backgroundColor: color, color: textColor }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Box>{icon}</Box>
        </Box>
        <Typography variant="h3" component="div" mb={2}>
          {value}
        </Typography>
        <Box display="flex" alignItems="center">
          {trend === "up" ? (
            <ArrowUp style={{ color: "green", marginRight: 4 }} />
          ) : (
            <ArrowDown style={{ color: "red", marginRight: 4 }} />
          )}
          <Typography variant="body2" color={trend === "up" ? "green" : "red"}>
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
