import { Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

const PageNotFoundContainer = styled("div")(({ theme }) => ({
  padding: "60px 0",
  background: "#f2f2f2",

  [theme.breakpoints.down("sm")]: {
    height: "450px",
    width: "95%",
  },
  [theme.breakpoints.up("sm")]: {
    height: "450px",
    width: "80%",
  },

  [theme.breakpoints.up("md")]: {
    height: "450px",
    width: "30%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "900px",
    width: "100%",
  },
}));

export function PageNotFound() {
  return (
    <>
      <PageNotFoundContainer>
        <Typography sx={{ color: "red" }} variant="h1" textAlign={"center"}>
          Page Not found
        </Typography>
      </PageNotFoundContainer>
    </>
  );
}
