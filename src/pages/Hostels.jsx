import DashboardLayout from "../layouts/DashboardLayout";
import {
  Typography,
  Button,
  Paper,
} from "@mui/material";

const Hostels = () => {
  return (
    <DashboardLayout>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
        >
          Hostel Management
        </Typography>

        <Button
          variant="contained"
          sx={{ mb: 2 }}
        >
          Add Hostel
        </Button>

        <Typography>
          Hostel records will appear here.
        </Typography>
      </Paper>
    </DashboardLayout>
  );
};

export default Hostels;