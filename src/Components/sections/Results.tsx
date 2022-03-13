import CardCustom from "../widgets/Card";
import { styled } from "@mui/material/styles";

const FeatureBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  justifyContent: "center",
  marginTop: "80px",
  padding: "0 250px",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

function ResultSection() {
  return (
    <>
      <FeatureBox>
        <CardCustom
          number="Cursos"
          name=""
          stats="Acesso a todos os cursos disponíveis no site com motor de busca, mostrando os mais vistos primeiro"
        />
        <CardCustom
          number="Galgos"
          name=""
          stats="Ao abrir a aba galgos, estará visualizando a pagina de venda da analise de galgos US, AU, E UK. Também estará visualizando o curso especifico para essa analise, e os tipsters disponiveis para seguir (grupo telegram)."
        />
        <CardCustom
          number="Futebol"
          name=""
          stats=" ao abrir a aba futebol, estará visualizando a venda de analise de futebol, o curso, os tipsters disponiveis e o robo de analise"
        />
        <CardCustom
          number="FIFA"
          name=""
          stats=" aba fifa, visualiza a venda de analise de FIFA, os tipsters disponiveis e o robo de analise."
        />
        <CardCustom
          number="Robôs"
          name=""
          stats="mostra todos os robôs disponiveis, analise de futebol, fifa, galgos e de reaplicação(podendo seguir qualquer tipster para aposta automatica)."
        />
      </FeatureBox>
    </>
  );
}

export default ResultSection;
