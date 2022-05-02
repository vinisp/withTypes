import { Typography, TextField, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";

// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import QrCodeIcon from "@mui/icons-material/QrCode";
// import BarCode from "../assets/img/barcode-solid.svg";

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

/* const SelosWrap = styled("div")(({ theme }) => ({
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
})); */

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

/* const RowOpt2 = styled("div")(({ theme }) => ({
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
})); */

const Detalhes = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  overflowX: "hidden",
  height: "auto",
  flex: "0 0 30%",
  border: "solid 1px silver",
  borderRadius: "1px",
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
  const [cpf, setCpf] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardValid, setCardValid] = useState<string>("");
  const [secCode, setSecCode] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [saveCardData, setSaveCardData] = useState<boolean>(false);
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
    <>
      <TextField
        required
        label="Número do Cartão"
        placeholder="XXXX-XXXX-XXXX-XXXX"
        value={cardNumber}
        onChange={(e) => setCardNumber(masks.cardNumber(e.target.value))}
      />
      <TextField
        required
        label="Validade"
        placeholder="MM/AA"
        value={cardValid}
        onChange={(e) => setCardValid(masks.cardValid(e.target.value))}
      />

      <TextField
        required
        label="Cod Segurança"
        placeholder="XXX"
        value={secCode}
        onChange={(e) => setSecCode(masks.secCode(e.target.value))}
      />

      <TextField
        required
        label="Nome Impresso no Cartão"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
      />
      <div>
        <Checkbox
          color="success"
          id="saveCardData"
          onChange={(e) => setSaveCardData(e.target.checked)}
        />
        <label htmlFor="saveCardData">
          Usar esses dados nas próximas compras
        </label>
      </div>
      <Button
        onClick={() =>
          console.log({
            cardName,
            cardNumber,
            cardValid,
            secCode,
            saveCardData,
          })
        }
      >
        Finalizar Compra
      </Button>
    </>
  );

  const Boleto = (
    <div>
      <Button color="success" variant="contained">
        Gerar Boleto
      </Button>
    </div>
  );
  const Pix = (
    <div>
      <Button color="success" variant="contained">
        Gerar Pix
      </Button>
    </div>
  );

  function PaymentFormRender() {
    if (paymentOption === "boleto") {
      return Boleto;
    }
    if (paymentOption === "pix") {
      return Pix;
    }
    if (paymentOption === "credit") {
      return Credit;
    }
  }

  //Mascáras

  const masks = {
    cpf(value: string) {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    },
    phone(value: string) {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1)$2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
    },
    cardNumber(value: string) {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(\d{4})\d+?$/, "$1");
    },
    cardValid(value: string) {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})\d+?$/, "$1");
    },
    secCode(value: string) {
      return value.replace(/\D/g, "").replace(/(\d{4})\d+?$/, "$1");
    },
  };

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

          <form>
            <FormularioFields>
              <Row>
                <TextField
                  fullWidth
                  label="Nome Completo"
                  placeholder=""
                  variant="standard"
                  required
                />
              </Row>
              <Row>
                <TextField
                  fullWidth
                  label="Email"
                  placeholder=""
                  variant="standard"
                  type={"email"}
                  required
                />
              </Row>
              <Row>
                <TextField
                  fullWidth
                  label="CPF"
                  placeholder="999.999.999-99"
                  variant="standard"
                  value={cpf}
                  onChange={(e) => setCpf(masks.cpf(e.target.value))}
                  required
                />
              </Row>
              <Row>
                <TextField
                  fullWidth
                  label="Celular"
                  placeholder="(99)99999-9999"
                  variant="standard"
                  value={phone}
                  onChange={(e) => setPhone(masks.phone(e.target.value))}
                  required
                />
              </Row>
              <Row>
                <Typography>Escolha uma forma de pagamento: </Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                  }}
                >
                  <Button onClick={() => setPaymentOption("credit")}>
                    Cartão de Crédito
                  </Button>
                  <Button onClick={() => setPaymentOption("boleto")}>
                    Boleto
                  </Button>
                  <Button onClick={() => setPaymentOption("pix")}>Pix</Button>
                </Box>
              </Row>

              <Row>{PaymentFormRender()}</Row>
            </FormularioFields>
          </form>
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
