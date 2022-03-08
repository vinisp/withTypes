import { styled } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";

const FooterStyled = styled("footer")(({ theme }) => ({
  background: "#26272b",
  padding: "15px 0",
  fontSize: "15px",
  lineHeight: "24px",
  color: "#737373",

  margin: 0,
  height: "100%",

  width: "100%",
  ul: {
    listStyle: "none",
  },
  h4: {
    color: "white",
  },
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const ContainerFooter = styled("footer")(({ theme }) => ({
  display: "flex",
  gap: "35px",

  padding: "20px 0px 15px 35px",
  margin: 0,
  borderBottom: " solid 1px #737373",

  width: "100%",
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const AboutText = styled("footer")(({ theme }) => ({
  flex: "0 0 30%",
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

  ul: {
    display: "flex",
    gap: "15px",
  },
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.up("sm")]: {},

  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const CopyFooterBlock = styled("footer")(({ theme }) => ({
  padding: "15px 35px",
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
            <h4>SOBRE</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              nobis neque, temporibus modi eum nesciunt quos, quisquam, repellat
              unde eaque vitae tempora omnis veritatis assumenda quidem enim
              aperiam repudiandae minus.
            </p>
          </AboutText>
          <PoliticsFooterBlock>
            <h4>POLÍTICAS</h4>
            <ul>
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
              <li>Link 4</li>
            </ul>
          </PoliticsFooterBlock>
          <ContactsFooterBlock>
            <h4>CONTATOS</h4>
            <ul>
              <li>Contato 1</li>
              <li>Contato 2</li>
              <li>Contato 3</li>
            </ul>
          </ContactsFooterBlock>
          <SocialFooterBlock>
            <h4> REDES SOCIAIS </h4>
            <ul>
              <li>
                <FacebookIcon />
              </li>
              <li>
                <InstagramIcon />
              </li>
              <li>
                <WhatsAppIcon />
              </li>
              <li>
                <TwitterIcon />
              </li>
            </ul>
          </SocialFooterBlock>
        </ContainerFooter>
        <CopyFooterBlock> &copy; Todos os direitos reservados</CopyFooterBlock>
      </FooterStyled>
    </>
  );
}
