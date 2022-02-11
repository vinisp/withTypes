import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import SideMenu from "../Components/widgets/SideMenuMember";
import TableResults from "../Components/widgets/tables/table";
import TableWithTabs from "../Components/widgets/tables/tableWithTabs";

function MemberArea() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              textAlign={"center"}
              sx={{ color: "white" }}
            >
              Member Area
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <SideMenu />
          </Grid>
          <Grid item xs={10}>
            <TableResults />
          </Grid>
          <Grid item xs={10}>
            <TableWithTabs />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default MemberArea;
