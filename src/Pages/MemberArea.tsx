import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import SideMenu from "../Components/widgets/SideMenuMember";
import { TableResults, rows } from "../Components/widgets/tables/table";
import TableWithTabs from "../Components/widgets/tables/tableWithTabs";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";

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
  const ListTracks = new Set<string>(rows.map((e) => e.track)).keys();
  const FiltersByTrack = Array.from(ListTracks);

  /*const [filter, setFilter] = useState("0");
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  }; */

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
          <Select sx={{ background: "white", width: "110px", color: "black" }}>
            <MenuItem key={-1} value={"0"} sx={{ color: "black" }}>
              Default
            </MenuItem>
            {FiltersByTrack.map((e) => (
              <MenuItem key={e} value={e} sx={{ color: "black" }}>
                {e}
              </MenuItem>
            ))}
          </Select>
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
