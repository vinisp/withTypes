import { useState } from "react";

import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MainBox = styled("div")(({ theme }) => ({
  paddingTop: "80px",
  backgroundColor: "#030303",
  display: "flex",
  color: "white",
  gap: "15px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const ListModules = styled("ul")(({ theme }) => ({
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "5px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const ReadBox = styled("ul")(({ theme }) => ({
  background: "#f2f2f2",
  color: "black",
  display: "flex",
  flexDirection: "column",
  height: "85%",
  width: "100%",
  gap: "5px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

function ControlledAccordions() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            Módulo 1
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListModules>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ListModules>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export function CoursePage() {
  const { idCourse } = useParams<any>();
  const [openControls, setOpenControls] = useState<boolean>(true);

  const sideBarSize = openControls ? "20%" : "5%";
  const contentCourseSize = openControls ? "70%" : "85%";

  const SideBarContent = styled("div")(({ theme }) => ({
    backgroundColor: "#030",
    display: "flex",
    flexDirection: "column",
    color: "white",
    width: `${sideBarSize}`,
    height: "870px",
    border: "solid 1px yellow",
    transition: "all 2s ease",

    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("md")]: {},
    [theme.breakpoints.up("lg")]: {},
  }));

  const CourseContent = styled("div")(({ theme }) => ({
    backgroundColor: "#030303",
    display: "flex",
    flexDirection: "column",
    color: "white",
    width: `${contentCourseSize}`,
    height: "870px",
    border: "solid 1px white",

    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("md")]: {},
    [theme.breakpoints.up("lg")]: {},
  }));

  return (
    <>
      <MainBox>
        <SideBarContent>
          <h1>Course Page</h1>
          <h3>{idCourse}</h3>
          <button
            onClick={() => {
              openControls ? setOpenControls(false) : setOpenControls(true);
            }}
          >
            {openControls ? "Aberto" : "Fechado"}
          </button>
          {ControlledAccordions()}
        </SideBarContent>
        <CourseContent>
          <ReadBox>Render COntent</ReadBox>
          <div>Controls</div>
        </CourseContent>
      </MainBox>
    </>
  );
}
