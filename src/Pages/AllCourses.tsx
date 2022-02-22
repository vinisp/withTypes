import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useState } from "react";

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

const BoxCourses = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  width: "80%",
  height: "100%",
  gap: 10,
  background: "#f2f2f2f2",
  borderRadius: "4px",
  padding: 15,

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {
    height: "auto",
  },
  [theme.breakpoints.up("lg")]: {
    height: "auto",
  },
}));

//Mock Data

const coursesInfos = [
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
    console.log(listCourses);
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
            <Paper>
              <h3>{e.courseName}</h3>
              <h4>{e.courseType}</h4>
            </Paper>
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
          <BoxCourses>
            <Button onClick={() => AllCourses()}>Todos os Cursos</Button>
            {ArrayCategorys.map((e) => (
              <>
                <Button onClick={() => filterCourse(e)}>
                  <Typography> {e} </Typography>
                </Button>
              </>
            ))}
          </BoxCourses>
          <BoxCourses>
            {listCourses.length > 1 ? ListByCategory() : AllCourses()}
          </BoxCourses>
        </BoxCoursesMain>
      </Box>
    </>
  );
}
