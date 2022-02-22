import { Redirect } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export function MyCoursesPage() {
  const { user } = useAuth();
  if (!user) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <div>My Courses Page </div>
    </>
  );
}
