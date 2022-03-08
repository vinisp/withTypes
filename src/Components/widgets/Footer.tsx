import { styled } from "@mui/material/styles";

const FooterStyled = styled("footer")(({ theme }) => ({
  background: "#f2f2f2",
  padding: 0,
  margin: 0,
  height: "100%",

  width: "100%",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const ContainerFooter = styled("footer")(({ theme }) => ({
  display: "flex",

  background: "#f2f2f2",
  padding: 0,
  margin: 0,
  height: 80,

  width: "100%",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

export function Footer() {
  return (
    <>
      <FooterStyled>
        <ContainerFooter>
          <div>TERMOS</div>
          <div>POLÍTICAS</div>
          <div>CONTATOS</div>
          <div>REDES SOCIAIS</div>
        </ContainerFooter>
        <p> &copy; Todos os direitos reservados</p>
      </FooterStyled>
    </>
  );
}
