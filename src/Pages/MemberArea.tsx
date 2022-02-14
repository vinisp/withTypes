import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import SideMenu from "../Components/widgets/SideMenuMember";
import TableResults from "../Components/widgets/tables/table";
import TableWithTabs from "../Components/widgets/tables/tableWithTabs";

function MemberArea() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
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
          <Grid item xs={10} spacing={2}>
            <TableResults />
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <Grid item xs={5} lg={5} alignSelf={"center"}>
              <TableWithTabs />
            </Grid>
            <Grid item xs={5} alignSelf={"center"}>
              <TableWithTabs />
            </Grid>
            <Grid item xs={5} alignSelf={"center"}>
              <TableWithTabs />
            </Grid>
            <Grid item xs={5} alignSelf={"center"}>
              <TableWithTabs />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default MemberArea;
