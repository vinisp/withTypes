import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";

const MainBox = styled("div")(({ theme }) => ({
  paddingTop: "80px",
  backgroundColor: "#030303",
  display: "flex",
  color: "white",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {
    height: "auto",
  },
  [theme.breakpoints.up("lg")]: {
    height: "auto",
  },
}));

export function CoursePage() {
  const { idCourse } = useParams<any>();
  return (
    <>
      <MainBox>
        <div>
          <h1>Course Page</h1>
          <h3>{idCourse}</h3>
        </div>
        <div>
          <div>Render COntent</div>
          <div>Controls</div>
        </div>
      </MainBox>
    </>
  );
}
