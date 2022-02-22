import { Redirect } from "react-router-dom";
import { styled } from "@mui/material/styles";

import { useAuth } from "../hooks/useAuth";

import "./styles/CartPage.css";

const MainBoxCart = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  background: "#f2f2f2",

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
    width: "60%",
    display: "block",
  },
}));

const CourseDiv = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  borderBottom: "solid 1px silver",

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
    width: "95%",
    gap: 25,
  },
}));

const myCourses = [
  {
    courseID: "1",
    courseName: "Course1",
    courseType: "type1",
    coursePrice: "1",
    dataAdd: "12-12-2021",
    expData: "12-12-2022",
  },
  {
    courseID: "1",
    courseName: "Course1",
    courseType: "type1",
    coursePrice: "3",
    dataAdd: "12-12-2021",
    expData: "12-12-2022",
  },
  {
    courseID: "1",
    courseName: "Course1",
    courseType: "type1",
    coursePrice: "4",
    dataAdd: "12-12-2021",
    expData: "12-12-2022",
  },
  {
    courseID: "1",
    courseName: "Course1",
    courseType: "type1",
    coursePrice: "5",
    dataAdd: "12-12-2021",
    expData: "12-12-2022",
  },
  {
    courseID: "1",
    courseName: "Course1",
    courseType: "type1",
    coursePrice: "50",
    dataAdd: "12-12-2021",
    expData: "12-12-2022",
  },
  {
    courseID: "1",
    courseName: "Course1",
    courseType: "type1",
    coursePrice: "300",
    dataAdd: "12-12-2021",
    expData: "12-12-2022",
  },
];

export function CartPage() {
  const { user } = useAuth();
  if (!user) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <MainBoxCart className="CartPage">
        {myCourses.map((e) => (
          <CourseDiv key={e.courseID}>
            <h1>{e.courseName}</h1>
            <h3>{e.courseType}</h3>
            <h5> R$ {e.coursePrice}</h5>
          </CourseDiv>
        ))}
        <div>
          Total: R$ <span></span>
          {myCourses.reduce((i, e) => i + Number(e.coursePrice), 0)},00
        </div>
      </MainBoxCart>
    </>
  );
}
