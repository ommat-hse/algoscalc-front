import React from "react";
import ReactDOM from "react-dom/client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  getAlgorithmDescription,
  getAlgorithmResult,
  IParameter,
  IOutput,
  IAlgorithm,
  IAlgorithmData,
} from "../api";
import ourLogo from "../assets/images/logo.png";
import Button from "@mui/material/Button";
import ModalWindow from "./ModalWindow";
import BoolControl from "./controls/BoolControl";
import TextControl from "./controls/TextControl";
import MatrixControl from "./controls/MatrixControl";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import config from "../config";
import { DataTypeEnum } from "../api/data-type.enum";
import { DataShapeEnum } from "../api/data-shape.enum";
import ShareBlock from "./ShareBlock";
import { Navigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { AppError, ParseError } from "../errors";
import { parseValue } from "../utils/parse-value.util";
import Matrix from "./Matrix";

export const Algorithm = () => {
  const [openLoadWheal, setOpenLoadWheal] = React.useState(false);
  const [openDialogModal, setOpenDialogModal] = React.useState(false);
  const [goHomeModal, setGoHomeModal] = React.useState(false);
  const [wrongMessage, setWrongMessage] = React.useState("");
  const [modalTitle, setModalTitle] = React.useState("");

  const queryParameters = new URLSearchParams(window.location.search);
  const algoName: string = queryParameters.get("alg") ?? "";

  const [redirectToHome, setRedirectToHome] = React.useState(false);

  const [algorithmParameters, setAlgorithmParameters] = React.useState<
    JSX.Element[]
  >([]);
  const [algorithmOutputs, setAlgorithmOutputs] = React.useState<JSX.Element[]>(
    [],
  );
  const [algorithmDefinition, setAlgorithmDefinition] =
    React.useState<IAlgorithm>({
      name: "loading",
      title: "Загружаем алгоритм...",
      description: "Загружаем алгоритм...",
      parameters: [],
      outputs: [],
    });
  const getAlgorithmDefinitionOutput = (name: string) => {
    const outputs = algorithmDefinition.outputs.filter(
      (output) => output.name === name,
    );
    if (!outputs || outputs.length === 0) {
      throw new AppError(
        `Не найден элемент выходных данных [${name}]`,
      );
    }
    return outputs[0];
  }

  const handleError = (message: string, goHome = false) => {
    setOpenLoadWheal(false);
    setWrongMessage(message);
    setModalTitle("Произошла ошибка!");
    setGoHomeModal(goHome);
    setOpenDialogModal(!openDialogModal);
  };

  const redirectToHomePage = (home: boolean) => {
    if (home) {
      setRedirectToHome(true);
    }
  };

  const loadAlgorithm = () => {
    if (!algoName) {
      handleError("Не указан алгоритм!", true);
      return;
    }
    setOpenLoadWheal(true);
    getAlgorithmDescription(algoName)
      .then((result) => {
        setAlgorithmDefinition(result);
        setAlgorithmParameters(
          result.parameters.map((x: IParameter) => {
            if (x.data_shape === DataShapeEnum.MATRIX) {
              return (
                <MatrixControl
                  id={x.name}
                  title={x.title}
                  description={x.description}
                  key={x.name}
                />
              );
            } else if (x.data_type === DataTypeEnum.BOOL) {
              return (
                <BoolControl
                  id={x.name}
                  title={x.title}
                  description={x.description}
                  key={x.name}
                />
              );
            } else {
              return (
                <TextControl
                  id={x.name}
                  title={x.title}
                  description={x.description}
                  variant="filled"
                  key={x.name}
                  isReadOnly={false}
                />
              );
            }
          }),
        );
        setAlgorithmOutputs(
          result.outputs.map((x: IOutput) => {
            if (x.data_shape === DataShapeEnum.MATRIX) {
              return (
                <Tooltip title={x.description} arrow placement="left" key={x.name}>
                  <div>
                    <div style={{ fontWeight: "700" }}>{x.title}</div>
                    <div id={x.name} />
                  </div>
                </Tooltip>
              );
            } else if (x.data_type === DataTypeEnum.BOOL) {
              return (
                <BoolControl
                  id={x.name}
                  title={x.title}
                  description={x.description}
                  disabled={true}
                  key={x.name}
                />
              );
            } else {
              return (
                <TextControl
                  id={x.name}
                  title={x.title}
                  description={x.description}
                  variant="outlined"
                  isReadOnly={true}
                  key={x.name}
                />
              );
            }
          }),
        );
        setOpenLoadWheal(false);
      })
      .catch((error) => {
        handleError(
          error.message,
          error instanceof AppError ? error.redirectToHome : false,
        );
      });
  };

  React.useEffect(() => {
    loadAlgorithm();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setOpenLoadWheal(true);
    const parameters: IAlgorithmData[] = [];
    for (const parameter of algorithmDefinition.parameters) {
      let paramValue: any;
      if (parameter.data_shape === DataShapeEnum.MATRIX) {
        paramValue = getMatrixValue(parameter);
      } else if (
        parameter.data_shape === DataShapeEnum.SCALAR &&
        parameter.data_type === DataTypeEnum.BOOL
      ) {
        const boolElement = document.getElementById(parameter.name);
        if (!boolElement || !("checked" in boolElement)) {
          throw new AppError(
            `Не найдено значение параметра [${parameter.title}]`,
          );
        }
        paramValue = String(boolElement.checked);
      } else {
        paramValue = String(getValueByElementId(parameter.name));
      }

      let parsedValue;
      try {
        parsedValue = parseValue(
          paramValue,
          parameter.data_type,
          parameter.data_shape,
        );
      } catch (error) {
        if (error instanceof ParseError) {
          error.message = `Параметр ${parameter.title} - ${error.message}`;
        }
        throw error;
      }

      parameters.push({
        name: parameter.name,
        value: parsedValue,
      });
    }

    getAlgorithmResult(algoName, parameters)
      .then((res) => {
        for (const resultOutput of res) {
          const output = getAlgorithmDefinitionOutput(resultOutput.name);
          const outputElement = getElementById(
            output.name,
            `Не найден элемент выходных данных для [${output.title}]`,
          );

          if (output.data_shape === DataShapeEnum.MATRIX) {
            const completedMatrixId = `${output.name}-completed`;
            const completedMatrixElement =
              document.getElementById(completedMatrixId);
            if (completedMatrixElement) {
              completedMatrixElement.remove();
            }

            ReactDOM.createRoot(outputElement).render(
              <Matrix id={output.name} value={resultOutput.value}/>
            );
          } else if (
            output.data_shape === DataShapeEnum.SCALAR &&
            output.data_type === DataTypeEnum.BOOL
          ) {
            (outputElement as HTMLInputElement).checked = Boolean(
              resultOutput.value,
            );
          } else {
            (outputElement as HTMLInputElement).value = resultOutput.value;
          }
        }
        setOpenLoadWheal(false);
      })
      .catch((error) => {
        let message = "Произошла непредвиденная ошибка";
        let goHome = false;
        if (error instanceof AppError) {
          message = error.message;
          goHome = error.redirectToHome;
        }
        handleError(message, goHome);
      });
  };

  const telegramUrl = `${config.appHost}/algorithm?alg=${algoName}&text=Онлайн калькуляторы OMMAT.ru - ${algorithmDefinition.title}`;
  const vkUrl = `${config.appHost}/algorithm?alg=${algoName}&title=Онлайн калькуляторы OMMAT.ru - ${algorithmDefinition.title}&noparse=true&image=${config.appHost}${ourLogo}`;

  return (
    <>
      {redirectToHome && <Navigate to="/" />}
      <div>
        <Backdrop sx={{ color: "#fff", zIndex: 2000 }} open={openLoadWheal}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <div>
        {openDialogModal && (
          <ModalWindow
            title={modalTitle}
            message={wrongMessage}
            onClose={(goHome?: boolean) => {
              setOpenDialogModal(!openDialogModal);
              redirectToHomePage(goHome || false);
            }}
            isActive={openDialogModal}
            goHome={goHomeModal}
          />
        )}
      </div>
      <div
        style={{
          margin: "5px",
          width: "100%",
          display: "grid",
          minHeight: "100%",
          gridTemplateRows: "1fr auto",
          gridTemplateColumns: "100%",
        }}
      >
        <div>
          <div style={{ marginLeft: "25px" }}>
            <h3>{algorithmDefinition.title}</h3>
            <p>{algorithmDefinition.description}</p>
          </div>
          <div>
            <Container style={{ marginTop: "10px", paddingRight: "0px" }}>
              <Box sx={{ bgcolor: "#F6F6F6", padding: "15px" }}>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    try {
                      handleSubmit(event);
                    } catch (error: any) {
                      if (error instanceof AppError) {
                        handleError(error.message, error.redirectToHome);
                      } else {
                        handleError(
                          "message" in error
                            ? error.message
                            : "Произошла непредвиденная ошибка",
                        );
                      }
                    }
                  }}
                >
                  <div>{algorithmParameters}</div>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ marginTop: "15px" }}
                  >
                    Получить результат
                  </Button>
                </form>
              </Box>
            </Container>
          </div>
          <div>
            <Container style={{ marginTop: "10px", paddingRight: "0px" }}>
              <Box sx={{ bgcolor: "#AFB4C1", padding: "15px" }}>
                {algorithmOutputs}
              </Box>
            </Container>
          </div>
        </div>
        <div>
          <ShareBlock telegramUrl={telegramUrl} vkUrl={vkUrl} />
        </div>
      </div>
    </>
  );
};

const getValueByElementId = (id: string, errorMessage: string = "") => {
  const element = document.getElementById(id);
  if (!element || !("value" in element)) {
    throw new AppError(errorMessage || `Не найден элемент с id [${id}]`);
  }
  return element.value;
};

const getElementById = (id: string, errorMessage: string = ""): HTMLElement => {
  const element = document.getElementById(id);
  if (!element || !(element instanceof HTMLElement)) {
    throw new AppError(errorMessage || `Не найден элемент с id [${id}]`);
  }
  return element;
};

const getMatrixValue = (parameter: IParameter) => {
  const matrixValue = [];
  const colCnt = Number(
    getValueByElementId(
      `${parameter.name}-select-column`,
      `Не найден размер для матрицы [${parameter.title}]`,
    ),
  );
  const rowCnt = Number(
    getValueByElementId(
      `${parameter.name}-select-row`,
      `Не найден размер для матрицы [${parameter.title}]`,
    ),
  );
  
  for (let rowIdx = 0; rowIdx < rowCnt; rowIdx++) {
    const row = [];
    for (let colIdx = 0; colIdx < colCnt; colIdx++) {
      row.push(
        getValueByElementId(
          `${parameter.name}-${rowIdx}-${colIdx}`,
          `Не найден элемент [${rowIdx}, ${colIdx}] для матрицы [${parameter.title}]`,
        ),
      );
    }
    matrixValue.push(row);
  }
  return matrixValue;
}