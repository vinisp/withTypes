import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import SideMenu from "../Components/widgets/SideMenuMember";
import TableResults from "../Components/widgets/tables/table";
import TableWithTabs from "../Components/widgets/tables/tableWithTabs";
import { styled } from "@mui/material/styles";

const ResponsiveMeberSizes = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 12,

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },

  [theme.breakpoints.up("md")]: {
    height: "auto",
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "auto",
    width: "100%",

    padding: 0,
  },
}));

const SideBarResponsive = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),

  [theme.breakpoints.down("sm")]: {
    width: "100%",

    display: "none",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
    display: "none",
  },

  [theme.breakpoints.up("md")]: {
    height: "auto",
    width: "8%",
    display: "none",
  },
  [theme.breakpoints.up("lg")]: {
    height: "auto",
    width: "8%",
    display: "block",
    padding: 0,
  },
}));

function MemberArea() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h5" textAlign={"center"} sx={{ color: "white" }}>
          Member Area
        </Typography>
      </Box>

      <ResponsiveMeberSizes>
        <SideBarResponsive>
          <SideMenu />
        </SideBarResponsive>
        <Grid container sx={{}} spacing={1}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ borderBottom: "solid 1px silver", background: "#f2f2f2f2" }}
          >
            <Typography variant="h4" color="black">
              Título da seção
            </Typography>
            <Typography variant="subtitle1" color="black">
              SubTítulo da seção
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <TableResults />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <TableResults />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <TableResults />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TableResults />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <TableWithTabs />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <TableWithTabs />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <TableWithTabs />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <TableWithTabs />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <TableWithTabs />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <TableWithTabs />
          </Grid>
        </Grid>
      </ResponsiveMeberSizes>
    </>
  );
}

export default MemberArea;
