import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

const APIURL = "https://deppback.herokuapp.com/";

export function PayOneCourse() {
  const [course, setCourse] = useState<any[]>([]);
  let { idCourse } = useParams<any>();

  function GetCourseData() {
    useEffect(() => {
      axios
        .get(`${APIURL}course/${idCourse}`)
        .then((response) => setCourse(response.data));
    }, []);
  }

  GetCourseData();

  return (
    <>
      <Box
        sx={{
          paddingTop: 20,
          backgroundColor: "#FFF",
        }}
      >
        <h1>Pay One Course Page</h1>
        <h2>Comprar o Curso {idCourse} </h2>
        {course.length > 0 ? (
          [course[0].name, course[0].price, course[0].thumb_url]
        ) : (
          <Typography>Carregando </Typography>
        )}
      </Box>
    </>
  );
}
