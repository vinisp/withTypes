import { styled } from "@mui/material/styles";

const FooterStyled = styled("footer")(({ theme }) => ({
  background: "#26272b",
  padding: "45px 20px 40px 55px",
  fontSize: "15px",
  lineHeight: "24px",
  color: "#737373",

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

  padding: "15px 0px",
  margin: 0,
  borderBottom: " solid 1px #737373",

  width: "100%",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const AboutText = styled("footer")(({ theme }) => ({
  flex: "0 0 40%",
  padding: 0,
  margin: 0,

  width: "100%",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const PoliticsFooterBlock = styled("footer")(({ theme }) => ({
  flex: "0 0 20%",
  padding: 0,
  margin: 0,

  width: "100%",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const ContactsFooterBlock = styled("footer")(({ theme }) => ({
  flex: "0 0 20%",
  padding: 0,
  margin: 0,

  width: "100%",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const SocialFooterBlock = styled("footer")(({ theme }) => ({
  flex: "0 0 20%",
  padding: 0,
  margin: 0,

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
          <AboutText>
            <h5>About</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              nobis neque, temporibus modi eum nesciunt quos, quisquam, repellat
              unde eaque vitae tempora omnis veritatis assumenda quidem enim
              aperiam repudiandae minus.
            </p>
          </AboutText>
          <PoliticsFooterBlock>POLÍTICAS</PoliticsFooterBlock>
          <ContactsFooterBlock>CONTATOS</ContactsFooterBlock>
          <SocialFooterBlock>REDES SOCIAIS</SocialFooterBlock>
        </ContainerFooter>
        <p> &copy; Todos os direitos reservados</p>
      </FooterStyled>
    </>
  );
}
