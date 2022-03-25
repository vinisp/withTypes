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
      <div>
        Menu Lateral com as informações - Avatar - Nome - Principais interesses
        - Cursos Criados - Cursos Comprados - Cursos Promovidos{" "}
      </div>

      <div>
        Pensar em uma área de trabalho, está pode conter informações sobre os
        tipster, eventos em andamento e próximos eventos
      </div>
    </>
  );
}
