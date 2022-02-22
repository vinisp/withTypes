import { Redirect } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export function Profile() {
  const { user } = useAuth();
  if (!user) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <div>Profile Page </div>
    </>
  );
}
