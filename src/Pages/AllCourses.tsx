import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useState } from "react";

import "./styles/AllCourses.css";

const BoxIntro = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#072143",
  width: "100%",
  height: "100%",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {
    height: "auto",
  },
  [theme.breakpoints.up("lg")]: {
    height: "500px",
  },
}));

const BoxCoursesMain = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "#072143",
  width: "100%",
  height: "auto",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {
    height: "auto",
  },
  [theme.breakpoints.up("lg")]: {
    heigth: "auto",
  },
}));

const BoxCourses = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  width: "60%",
  height: "100%",
  padding: "35px 0",
  gap: 10,
  background: "#f2f2f2f2",
  borderRadius: "4px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {
    height: "auto",
  },
  [theme.breakpoints.up("lg")]: {
    height: "auto",
  },
}));

const BoxCategorys = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  width: "70%",
  height: "100%",
  gap: 10,

  borderRadius: "4px",

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {
    height: "auto",
  },
  [theme.breakpoints.up("lg")]: {
    height: "auto",
  },
}));

const StyledCardCourse = styled("div")(({ theme }) => ({
  flex: "0 0 70%",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    flex: "0 0 100%",
  },
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 100%",
  },

  [theme.breakpoints.up("md")]: {
    height: "auto",
    flex: "0 0 40%",
  },
  [theme.breakpoints.up("lg")]: {
    height: "auto",
  },
}));

//Mock Data

export const coursesInfos = [
  {
    courseID: "1",
    courseName: "Course1",
    courseType: "type1",
    coursePrice: "1",

    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet enim numquam vitae similique a deserunt
    necessitatibus, ipsam hic aut provident voluptatum perspiciatis laborum. Quasi iste ab vitae soluta culpa
    temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non suscipit saepe, iure ipsam totam numquam
    eius dolorem vitae consequatur quia doloremque repellat similique ut nisi harum nihil! Mollitia, a facere`,
  },
  {
    courseID: "2",
    courseName: "Course1",
    courseType: "type2",
    coursePrice: "3",

    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet enim numquam vitae similique a deserunt
    necessitatibus, ipsam hic aut provident voluptatum perspiciatis laborum. Quasi iste ab vitae soluta culpa
    temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non suscipit saepe, iure ipsam totam numquam
    eius dolorem vitae consequatur quia doloremque repellat similique ut nisi harum nihil! Mollitia, a facere`,
  },
  {
    courseID: "3",
    courseName: "Course1",
    courseType: "type3",
    coursePrice: "4",

    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet enim numquam vitae similique a deserunt
    necessitatibus, ipsam hic aut provident voluptatum perspiciatis laborum. Quasi iste ab vitae soluta culpa
    temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non suscipit saepe, iure ipsam totam numquam
    eius dolorem vitae consequatur quia doloremque repellat similique ut nisi harum nihil! Mollitia, a facere`,
  },
  {
    courseID: "4",
    courseName: "Course1",
    courseType: "type1",
    coursePrice: "5",

    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet enim numquam vitae similique a deserunt
    necessitatibus, ipsam hic aut provident voluptatum perspiciatis laborum. Quasi iste ab vitae soluta culpa
    temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non suscipit saepe, iure ipsam totam numquam
    eius dolorem vitae consequatur quia doloremque repellat similique ut nisi harum nihil! Mollitia, a facere`,
  },
  {
    courseID: "4",
    courseName: "Course1",
    courseType: "type2",
    coursePrice: "50",

    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet enim numquam vitae similique a deserunt
    necessitatibus, ipsam hic aut provident voluptatum perspiciatis laborum. Quasi iste ab vitae soluta culpa
    temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non suscipit saepe, iure ipsam totam numquam
    eius dolorem vitae consequatur quia doloremque repellat similique ut nisi harum nihil! Mollitia, a facere`,
  },
  {
    courseID: "5",
    courseName: "Course1",
    courseType: "type3",
    coursePrice: "300",

    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet enim numquam vitae similique a deserunt
    necessitatibus, ipsam hic aut provident voluptatum perspiciatis laborum. Quasi iste ab vitae soluta culpa
    temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non suscipit saepe, iure ipsam totam numquam
    eius dolorem vitae consequatur quia doloremque repellat similique ut nisi harum nihil! Mollitia, a facere`,
  },
  {
    courseID: "5",
    courseName: "Course1",
    courseType: "type4",
    coursePrice: "300",

    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet enim numquam vitae similique a deserunt
    necessitatibus, ipsam hic aut provident voluptatum perspiciatis laborum. Quasi iste ab vitae soluta culpa
    temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non suscipit saepe, iure ipsam totam numquam
    eius dolorem vitae consequatur quia doloremque repellat similique ut nisi harum nihil! Mollitia, a facere`,
  },
  {
    courseID: "5",
    courseName: "Course1",
    courseType: "type1",
    coursePrice: "300",

    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet enim numquam vitae similique a deserunt
    necessitatibus, ipsam hic aut provident voluptatum perspiciatis laborum. Quasi iste ab vitae soluta culpa
    temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non suscipit saepe, iure ipsam totam numquam
    eius dolorem vitae consequatur quia doloremque repellat similique ut nisi harum nihil! Mollitia, a facere`,
  },
];

export function AllCourses() {
  const categorys = new Set<string>(coursesInfos.map((e) => e.courseType));
  const ArrayCategorys = Array.from(categorys);
  const [listCourses, setListCourses] = useState([
    {
      courseID: "",
      courseName: "",
      courseType: "",
      coursePrice: "",
      description: "",
    },
  ]);
  function filterCourse(courseType: string) {
    const filterCourses = coursesInfos.filter(
      (e) => e.courseType === courseType
    );
    listCourses.splice(1, listCourses.length);
    return filterCourses.flat().map((e) =>
      setListCourses((listCourses) => [
        ...listCourses,
        {
          courseID: e.courseID,
          courseName: e.courseName,
          courseType: e.courseType,
          coursePrice: e.courseType,
          description: e.description,
        },
      ])
    );
  }

  function AllCourses() {
    listCourses.splice(1, listCourses.length);

    return (
      <>
        {coursesInfos.map((e) =>
          setListCourses((listCourses) => [
            ...listCourses,
            {
              courseID: e.courseID,
              courseName: e.courseName,
              courseType: e.courseType,
              coursePrice: e.courseType,
              description: e.description,
            },
          ])
        )}
      </>
    );
  }

  function ListByCategory() {
    return (
      <>
        {listCourses.map((e) => (
          <>
            <StyledCardCourse className="myCardsCourses" key={e.courseID}>
              <Paper
                sx={{
                  width: "auto",
                  height: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h3>{e.courseName}</h3>
                <h4>{e.courseType}</h4>
                <Button variant="outlined">Adicionar ao carrinho</Button>
              </Paper>
            </StyledCardCourse>
          </>
        ))}
      </>
    );
  }

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <BoxIntro>
          <Typography
            color={"#6CD1FC"}
            variant={"h3"}
            sx={{ fontWeight: 600, textAlign: "left" }}
          >
            Cursos da escola Pro Tipster
          </Typography>
          <Typography sx={{ width: "50% ", color: "white" }}>
            Desenvolva suas habilidades para se tornar um tipster profissional
            com altos rendimentos, nós vamos te ensinar técnicas avançadas para
            alavancar sua banca de forma consistente
          </Typography>
        </BoxIntro>
        <Typography color={"white"} variant={"h3"}>
          Nossos Cursos
        </Typography>
        <BoxCoursesMain>
          <BoxCategorys>
            <Button onClick={() => AllCourses()}>Todos os Cursos</Button>
            {ArrayCategorys.map((e) => (
              <>
                <Button onClick={() => filterCourse(e)}>
                  <Typography> {e} </Typography>
                </Button>
              </>
            ))}
          </BoxCategorys>
          <BoxCourses>
            {listCourses.length > 1 ? ListByCategory() : AllCourses()}
          </BoxCourses>
        </BoxCoursesMain>
      </Box>
    </>
  );
}
