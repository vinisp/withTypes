import { Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import QrCodeIcon from "@mui/icons-material/QrCode";
import BarCode from "../assets/img/barcode-solid.svg";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import NumberFormat from "react-number-format";

import axios from "axios";

const APIURL = "https://deppback.herokuapp.com/";

// "###.###.###-##" || "##.###.###/####-##";

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

const PaySchema = Yup.object().shape({
  Name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  Email: Yup.string().email("Invalid email").required("Required"),
  Phone: Yup.string().required("Required"),
  CpfC: Yup.string().required("Required"),
});

export function PayOneCourse() {
  const [course, setCourse] = useState<any[]>([]);
  const [paymentOption, setPaymentOption] = useState<string>("");

  const [maskCpf, setMaskCpf] = useState<string>("");
  let { idCourse } = useParams<any>();

  function MaskCpfCnpjGenerator(Cpf: string) {
    if (Cpf.length > 11) {
      return "###-###-###-##";
    } else {
      return "####-###-###-#####";
    }
  }

  function GetCourseData() {
    useEffect(() => {
      axios
        .get(`${APIURL}course/${idCourse}`)
        .then((response) => setCourse(response.data));
    }, []);
  }

  GetCourseData();

  const Credit = () => (
    <FormularioFields>
      <Row>
        <Row>
          <label htmlFor="CardNumber">Número do Cartão</label>
          <Field
            name="CardNumber"
            render={({ field }: any) => (
              <NumberFormat
                {...field}
                mask="_"
                format={`####-####-####-####`}
              />
            )}
          />
        </Row>
      </Row>
      <RowOpt2>
        <RowChild sx={{ flex: "0 0 55%" }}>
          <label htmlFor="CardValid">Validade do Cartão(MM/AA)</label>
          <Field
            name="CardValid"
            render={({ field }: any) => (
              <NumberFormat {...field} mask="_" format={`##/##`} />
            )}
          />
        </RowChild>
        <RowChild sx={{ flex: "0 0 40%" }}>
          <label htmlFor="CodSeg">Cod. Segurança</label>
          <Field
            name="CodSeg"
            render={({ field }: any) => (
              <NumberFormat {...field} mask="_" format={`####`} />
            )}
          />
        </RowChild>
      </RowOpt2>
      <Row>
        <label htmlFor="CardName">Nome impresso no Cartão</label>
        <Field name="CardName" />
      </Row>
      <Row>
        <label>Parcelas****</label>
        <TextField fullWidth />
      </Row>
      <Button color="success" fullWidth variant="contained">
        Finalizar Compra
      </Button>
    </FormularioFields>
  );
  const Boleto = (
    <div>
      <Button color="success" fullWidth variant="contained">
        Gerar Boleto
      </Button>
    </div>
  );
  const Pix = (
    <div>
      <Button color="success" fullWidth variant="contained">
        Gerar Pix
      </Button>
    </div>
  );

  function PaymentFormRender() {
    if (paymentOption === "credit") {
      return <Credit />;
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
            <Formik
              initialValues={{
                Name: "",
                Email: "",
                Phone: "",
                CpfOrCnpJ: "",
                CardNumber: "",
                CardValid: "",
                CodSeg: "",
                CardName: "",
              }}
              validationSchema={PaySchema}
              onSubmit={(values) => {
                // same shape as initial values
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Row>
                    <label htmlFor="Name">Nome Completo</label>
                    <Field name="Name" type="text" />
                    {errors.Name && touched.Name ? (
                      <div>{errors.Name}</div>
                    ) : null}
                  </Row>
                  <Row>
                    <label htmlFor="Email">Email</label>
                    <Field name="Email" type="email" />
                    {errors.Email && touched.Email ? (
                      <div>{errors.Email}</div>
                    ) : null}
                  </Row>
                  <Row>
                    <label htmlFor="Phone">Celular</label>
                    <Field
                      name="Phone"
                      render={({ field }: any) => (
                        <NumberFormat
                          {...field}
                          type="tel"
                          mask="_"
                          format="(##) #####-####"
                        />
                      )}
                    />
                    {errors.Phone && touched.Phone ? (
                      <div>{errors.Phone}</div>
                    ) : null}
                  </Row>
                  <Row>
                    <label htmlFor="CpfOrCnpj">CPF ou CNPJ</label>
                    <Field
                      name="CpfOrCnpj"
                      render={({ field }: any) => (
                        <NumberFormat
                          {...field}
                          mask="_"
                          format={`${MaskCpfCnpjGenerator(maskCpf)}`}
                          onChange={(e: any) => setMaskCpf(e.target.value)}
                        />
                      )}
                    />
                    {errors.CpfOrCnpJ && touched.CpfOrCnpJ ? (
                      <div>{errors.CpfOrCnpJ}</div>
                    ) : null}
                    <p>Seus dados serão mantidos em sigilo</p>
                    <p>SELECIONE UM MÉTODO DE PAGAMENTO</p>
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
                </Form>
              )}
            </Formik>
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
