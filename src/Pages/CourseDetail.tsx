import { useParams } from "react-router-dom";

export function CourseDetail() {
  const { idCourse } = useParams<any>();

  return (
    <>
      <h1>Course Detail Page</h1>
      <h3> {idCourse}</h3>
    </>
  );
}
