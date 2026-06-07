import { Card, CardContent, Typography } from "@mui/material";

const StatCard = ({ title, value, color }) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        background: color,
        color: "#fff",
      }}
    >
      <CardContent>
        <Typography variant="h6">
          {title}
        </Typography>

        <Typography
          variant="h3"
          fontWeight="bold"
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;