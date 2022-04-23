import { Box, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

const APIURL = "https://deppback.herokuapp.com/";

const Container = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f2f2",
  display: "flex",
  alignItems: "flex-start",

  overflowX: "hidden",
  height: "auto",

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
    padding: "0 200px",
  },
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
  paddingTop: "120px",
  paddingBottom: "80px",
  paddingLeft: "80px",
  paddingRight: "80px",
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",

  flex: "0 0 70%",
  border: "solid 1px silver",
  marginTop: 5,

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

const FormularioFields = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f2f2f2",
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

  gap: "6px",
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

const Detalhes = styled("div")(({ theme }) => ({
  backgroundColor: "yellow",

  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  overflowX: "hidden",
  height: "auto",
  flex: "0 0 30%",

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

export function PayOneCourse() {
  const [course, setCourse] = useState<any[]>([]);
  const [paymentOption, setPaymentOption] = useState<string>("");
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
        <TextField fullWidth />
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
    </FormularioFields>
  );
  const Boleto = <div> Boleto: </div>;
  const Pix = <div> Pix: </div>;
  const PayPal = <div> PayPal: </div>;

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
    if (paymentOption === "payPal") {
      return PayPal;
    }
  }

  return (
    <>
      <Box
        sx={{
          paddingTop: 20,
          backgroundColor: "#FFF",
        }}
      >
        {course.length > 0 ? (
          [course[0].name, course[0].price, course[0].thumb_url]
        ) : (
          <Typography>Carregando </Typography>
        )}
      </Box>

      <Container>
        <Banner>Banner</Banner>
        <Formulario>
          <div className="MiniAndPrice">
            <div>Miniatura</div>
            <div>
              <div>Nome do curso</div>
              <div>Preço</div>
            </div>
          </div>
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
              <div>
                <Button onClick={() => setPaymentOption("credit")}>
                  Cartão de Crédito
                </Button>
              </div>
              <div>
                <Button onClick={() => setPaymentOption("boleto")}>
                  Boleto
                </Button>
              </div>
              <div>
                <Button onClick={() => setPaymentOption("pix")}>Pix</Button>
              </div>
              <div>
                <Button onClick={() => setPaymentOption("payPal")}>
                  PayPal
                </Button>
              </div>
            </GroupSelect>
            {PaymentFormRender()}
          </FormularioFields>

          <div>Rodapé</div>
        </Formulario>
        <Detalhes>25%</Detalhes>
      </Container>
    </>
  );
}
