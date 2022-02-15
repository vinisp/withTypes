import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TableResults } from "./table";
import { styled } from "@mui/material/styles";

const TableSizes = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),

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
    border: 0,
    padding: 0,
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <TableSizes
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </TableSizes>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TableWithTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          color: "white",
        }}
      >
        <TabPanel value={value} index={0}>
          <TableResults />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableResults />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TableResults />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <TableResults />
        </TabPanel>
      </Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          border: "0",
          width: "auto",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ background: "white", padding: "0 !important" }}
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
        </Tabs>
      </Box>
    </>
  );
}

export default TableWithTabs;
