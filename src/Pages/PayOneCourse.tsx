import { Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import QrCodeIcon from "@mui/icons-material/QrCode";
import BarCode from "../assets/img/barcode-solid.svg";

import InputMask from "react-input-mask";

import axios from "axios";

const APIURL = "https://deppback.herokuapp.com/";

const Container = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f2f2",
  display: "flex",
  alignItems: "flex-start",

  overflowX: "hidden",
  height: "auto",
  gap: "20px",

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("sm")]: {
    flexWrap: "wrap",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "120px 200px",
  },
}));

const SelosWrap = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",

  overflowX: "hidden",
  height: "auto",
  gap: "16px",

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("sm")]: {
    flexWrap: "wrap",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("lg")]: {},
}));

const Banner = styled("div")(({ theme }) => ({
  backgroundColor: "#0c0c0c",
  display: "flex",
  color: "white",
  fontSize: 80,
  gap: "10px",
  overflowX: "hidden",
  height: "280px",
  flex: "0 0 100%",

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("sm")]: {
    flexWrap: "wrap",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "",
    heigth: "480px",
  },
}));

const Formulario = styled("div")(({ theme }) => ({
  paddingTop: "20px",
  paddingBottom: "80px",
  paddingLeft: "20px",
  paddingRight: "20px",
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  backgroundColor: "#FFF",

  flex: "0 0 60%",
  border: "solid 1px silver",
  marginTop: "16px",

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("sm")]: {
    flexWrap: "wrap",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: "40px",
    paddingBottom: "80px",
  },
  [theme.breakpoints.up("lg")]: {},
}));

const FormularioFields = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  display: "flex",

  gap: "12px",
  flex: "0 0 100%",

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("sm")]: {
    flexWrap: "wrap",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("lg")]: {},
}));

const Row = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  flex: "0 0 100%",

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("sm")]: {
    flexWrap: "wrap",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("lg")]: {},
}));

const RowOpt2 = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "20px",
  flex: "0 0 100%",

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("sm")]: {
    flexWrap: "wrap",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("lg")]: {},
}));

const RowChild = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("sm")]: {
    flexWrap: "wrap",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("lg")]: {},
}));

const GroupSelect = styled("div")(({ theme }) => ({
  display: "flex",

  gap: "18px",
  flex: "0 0 100%",
  img: {
    width: "20px",
  },

  button: {
    color: "black",
    border: "solid 1px black",
    height: "60px",
    width: "160px",
    display: "flex",
  },

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("sm")]: {
    flexWrap: "wrap",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("lg")]: {},
}));

const Detalhes = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  overflowX: "hidden",
  height: "auto",
  flex: "0 0 30%",
  border: "solid 1px silver",
  borderRadius: "4px",
  marginTop: "16px",
  backgroundColor: "#FFF",

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("sm")]: {
    flexWrap: "wrap",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: "120px",
    paddingBottom: "80px",
  },
  [theme.breakpoints.up("lg")]: {},
}));

const MiniAndPrice = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  overflowX: "hidden",
  height: "auto",
  flex: "0 0 100%",

  img: {
    width: "180px",
  },

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("sm")]: {
    flexWrap: "wrap",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("lg")]: {},
}));

export function PayOneCourse() {
  const [course, setCourse] = useState<any[]>([]);
  const [paymentOption, setPaymentOption] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  let { idCourse } = useParams<any>();

  function GetCourseData() {
    useEffect(() => {
      axios
        .get(`${APIURL}course/${idCourse}`)
        .then((response) => setCourse(response.data));
    }, []);
  }

  GetCourseData();

  const Credit = (
    <FormularioFields>
      <Row>
        <label>Número do cartão</label>
        <InputMask
          className="cardNumber"
          mask={"9999-9999-9999-9999"}
          onChange={(e: any) => setCardNumber(e.target.value)}
        />
        {console.log(cardNumber)}
      </Row>
      <RowOpt2>
        <RowChild sx={{ flex: "0 0 55%" }}>
          <label>Validade</label>
          <TextField sx={{ width: "100%" }} />
        </RowChild>
        <RowChild sx={{ flex: "0 0 40%" }}>
          <label>Cód de Segurança</label>
          <TextField sx={{ width: "100%" }} />
        </RowChild>
      </RowOpt2>
      <Row>
        <label>Nome impresso no cartão</label>
        <TextField fullWidth />
      </Row>
      <Row>
        <label>Parcelas****</label>
        <TextField fullWidth />
      </Row>
      <Row>
        <Button color="success" fullWidth variant="contained">
          Finalizar Compra
        </Button>
      </Row>
    </FormularioFields>
  );
  const Boleto = (
    <div>
      <Button>Gerar Boleto</Button>
    </div>
  );
  const Pix = (
    <div>
      <Button>Gerar Pix</Button>
    </div>
  );

  function PaymentFormRender() {
    if (paymentOption === "credit") {
      return Credit;
    }
    if (paymentOption === "boleto") {
      return Boleto;
    }
    if (paymentOption === "pix") {
      return Pix;
    }
  }

  return (
    <>
      <Container>
        <Banner>Banner</Banner>
        <Formulario>
          <MiniAndPrice>
            <div>
              {course.length > 0 ? (
                <img src={course[0].thumb_url} alt="" />
              ) : (
                <Typography>Carregando </Typography>
              )}
            </div>
            <div>
              {course.length > 0 ? (
                <>
                  <Typography sx={{ fontWeight: 600, fontSize: 24 }}>
                    {[course[0].name]}
                  </Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: 24 }}>
                    R$ {[course[0].price]}
                  </Typography>
                  <Typography>à vista</Typography>
                </>
              ) : (
                <Typography>Carregando </Typography>
              )}
            </div>
          </MiniAndPrice>
          <FormularioFields>
            <Row>
              <label>Nome Completo</label>
              <TextField fullWidth />
            </Row>
            <Row>
              <label>E-mail</label>
              <TextField fullWidth />
            </Row>
            <Row>
              <label>Celular</label>
              <TextField fullWidth />
            </Row>
            <Row>
              <label>CPF ou CNPJ</label>
              <TextField fullWidth />
            </Row>
            <GroupSelect>
              <Button onClick={() => setPaymentOption("credit")}>
                <CreditCardIcon /> <span> Cartão de Crédito </span>
              </Button>

              <Button onClick={() => setPaymentOption("boleto")}>
                <img src={BarCode} alt="icone de barras" />
                <span> Boleto </span>
              </Button>

              <Button onClick={() => setPaymentOption("pix")}>
                <QrCodeIcon />
                <span> Pix </span>
              </Button>
            </GroupSelect>
            {PaymentFormRender()}
          </FormularioFields>

          <SelosWrap>
            <div>Selo 1</div>
            <div>Selo 2</div>
            <div>Selo 3</div>
          </SelosWrap>
        </Formulario>
        <Detalhes>
          {course.length > 0 ? (
            <Typography> {course[0].main_resume}</Typography>
          ) : (
            <Typography>Carregando </Typography>
          )}
        </Detalhes>
      </Container>
    </>
  );
}
