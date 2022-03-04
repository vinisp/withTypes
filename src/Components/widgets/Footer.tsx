import { styled } from "@mui/material/styles";

const FooterStyled = styled("footer")(({ theme }) => ({
  background: "#f2f2f2",
  padding: 0,
  margin: 0,
  height: 80,
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

export function Footer() {
  return (
    <>
      <FooterStyled>
        <p> &copy; Todos os direitos reservados</p>
      </FooterStyled>
    </>
  );
}
