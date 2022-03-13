import { Redirect } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

import { styled, ThemeProvider, createTheme } from "@mui/material/styles";

const initialValues = {
  module: [
    {
      name: "",
      textContent: "",
      videoUrl: "",
    },
  ],
};

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    subtitle1: {
      /* border: "solid 2px white", */

      "@media (max-width:600px)": {
        padding: "0 2px",
        fontSize: 14,
      },
      "@media (min-width:600px)": {
        padding: "0 5px",
        fontSize: 16,
      },
      "@media (min-width:900px)": {
        padding: "0 10px",
        fontSize: 16,
      },
      "@media (min-width:1200px)": {
        padding: "0 35px",
        fontSize: 18,
      },
      "@media (min-width:1536px)": {
        padding: "0 105px",
        fontSize: 18,
      },
    },
    h1: {
      fontWeight: 600,

      "@media (max-width:600px)": {
        fontSize: 32,
      },
      "@media (min-width:600px)": {
        fontSize: 36,
      },
      "@media (min-width:900px)": {
        fontSize: 32,
      },
      "@media (min-width:1200px)": {
        fontSize: 48,
      },
      "@media (min-width:1536px)": {
        fontSize: 128,
      },
    },
    h4: {
      fontSize: 42,
    },

    h5: {
      fontSize: 18,
      marginBottom: 12,
    },
  },
});

const Container = styled("div")(({ theme }) => ({
  marginTop: "",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "0px",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "0px",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "30px",
  },
  [theme.breakpoints.up("lg")]: {
    height: "auto",
    display: "flex",
    background: "#f2f2f2",
    padding: "60px",
  },
}));

export function CreateCourse() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container>
          <h1>Create Course Page</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ values }) => (
              <Form>
                <FieldArray name="module">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.module.length > 0 &&
                        values.module.map((module, index) => (
                          <div className="row" key={index}>
                            <div className="col">
                              <label htmlFor={`module.${index}.name`}>
                                Name
                              </label>
                              <Field
                                name={`module.${index}.name`}
                                placeholder="Jane Doe"
                                type="text"
                              />
                              <ErrorMessage
                                name={`module.${index}.name`}
                                component="div"
                                className="field-error"
                              />
                            </div>
                            <div className="col">
                              <label htmlFor={`module.${index}.textContent`}>
                                Text Content
                              </label>
                              <Field
                                name={`module.${index}.textContent`}
                                placeholder="insira o texto"
                                type="text"
                              />
                              <ErrorMessage
                                name={`module.${index}.textContent`}
                                component="div"
                                className="field-error"
                              />
                            </div>
                            <div className="col">
                              <label htmlFor={`module.${index}.videoUrl`}>
                                Video Url
                              </label>
                              <Field
                                name={`module.${index}.videUrl`}
                                placeholder="insira o texto"
                                type="text"
                              />
                              <ErrorMessage
                                name={`module.${index}.videoUrl`}
                                component="div"
                                className="field-error"
                              />
                            </div>
                            <div className="col">
                              <button
                                type="button"
                                className="secondary"
                                onClick={() => remove(index)}
                              >
                                X
                              </button>
                            </div>
                          </div>
                        ))}
                      <button
                        type="button"
                        className="secondary"
                        onClick={() =>
                          push({ module: "", textContent: "", videoUrl: "" })
                        }
                      >
                        Add module
                      </button>
                    </div>
                  )}
                </FieldArray>
                <button type="submit">Invite</button>
              </Form>
            )}
          </Formik>
        </Container>
      </ThemeProvider>
    </>
  );
}
