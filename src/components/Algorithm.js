import React from "react";
import ReactDOM from 'react-dom';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom';
import {getAlgorithms, getAlgorithmDescription, getAlgorithmResult, host} from "../Api";
import telegramIcon from "./img/Telegram.png";
import vkIcon from "./img/VK.png";
import ourLogo from "./img/Logo.png";
import Button from '@mui/material/Button';
import ModalWindowDialog from "./ModalWindow/ModalWindowDialog";
import BooleanInput from "./controls/BooleanInput/BooleanInput";
import ScalarInput from "./controls/ScalarInput/ScalarInput";
import MatrixInput from "./controls/MatrixInput/MatrixInput";
import TextField from "@mui/material/TextField";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const Algorithm = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const algorithmParametr = queryParameters.get("alg");

    const [openDialogModal, setOpenDialogModal] = React.useState(false);
    const [goHomeModal, setGoHomeModal] = React.useState(false);
    const [wrongMessage, setWrongMessage] = React.useState("");
    const [modalTitle, setModalTitle] = React.useState("");

    const [algorithmTitle, setAlgorithmTitle] = React.useState("Загружаем алгоритм...");
    const [algorithmDescription, setAlgorithmDescription] = React.useState("Загружаем алгоритм...");
    const [redirectToHome, setRedirectToHome] = React.useState(false);

    const [algorithmsHaving, setAlgorithmsHaving] = React.useState("");

    const [algorithmParametrs, setAlgorithmParametrs] = React.useState("");
    const [algorithmOutputs, setAlgorithmOutputs] = React.useState("");

    const updateAlgorithms = () => {
        setOpenLoadWheal(true);
        getAlgorithms()
            .then((res) => {
                if(res !== null) {
                    setAlgorithmsHaving(res.data.algorithms.map((x) => (
                            <p key={`alg-${x.name}`}>
                                <Link href={`/algorithm?alg=${x.name}`} underline="hover" color="#46484D"
                                      id={`alg-${x.name}`}>{x.title}</Link>
                            </p>
                        )
                    ));
                }
                setOpenLoadWheal(false);
            }
            )
            .catch((error) => {
                setOpenLoadWheal(false);
                setWrongMessage(error.message);
                setModalTitle("Произошла ошибка!");
                setOpenDialogModal(!openDialogModal);
            });
    };

    interface IParametrs
    {
        name: string,
        title: string,
        description: string,
        data_type: string,
        data_shape: string
    }

    interface IOutputs
    {
        name: string,
        title: string,
        description: string,
        data_type: string,
        data_shape: string,
        value: string
    }

    const loadAlgorithm = () => {
        setOpenLoadWheal(true);
        getAlgorithmDescription(algorithmParametr)
            .then((res) => {
                if(res !== null) {
                    if(res.data.errors === null) {
                        setAlgorithmTitle(res.data.result.title);
                        setAlgorithmDescription(res.data.result.description);
                        setAlgorithmParametrs(res.data.result.parameters.map((x: IParametrs) => {
                            if(x.data_type === "bool")
                            {
                                return (
                                    <BooleanInput
                                      description={x.description}
                                      title={x.title}
                                      id={x.name}
                                      key={x.name}
                                      data_shape={x.data_shape}
                                      data_type={x.data_type}
                                    />
                                );
                            }
                            if(x.data_type !== "bool" && x.data_shape !== "matrix")
                            {
                                return (
                                    <ScalarInput
                                        title={x.title}
                                        description={x.description}
                                        variant="filled"
                                        isFullWidth={true}
                                        id={x.name}
                                        key={x.name}
                                        data_shape={x.data_shape}
                                        data_type={x.data_type}
                                        isReadOnly={false}
                                    />
                                );
                            }
                            if(x.data_shape === "matrix")
                            {
                                return (
                                    <MatrixInput
                                        title={x.title}
                                        description={x.description}
                                        id={x.name}
                                        key={x.name}
                                        data_shape={x.data_shape}
                                        data_type={x.data_type}
                                        isOutputMatrix={false}
                                    />
                                );
                            }
                        }));
                        setAlgorithmOutputs(res.data.result.outputs.map((x: IOutputs) => {
                            if(x.data_type === "bool")
                            {
                                return (
                                    <div key={x.name}>
                                        <input type="checkbox" id={x.name} disabled style={{margin: "0.4rem"}}/>
                                        <label htmlFor={x.name}>{x.title}</label>
                                    </div>
                                );
                            }
                            if(x.data_type !== "bool" && x.data_shape !== "matrix")
                            {
                                return (
                                    <ScalarInput
                                        title={x.title}
                                        variant="outlined"
                                        isFullWidth={true}
                                        id={x.name}
                                        key={x.name}
                                        data_shape={x.data_shape}
                                        data_type={x.data_type}
                                        isReadOnly={true}
                                    />
                                );
                            }
                            if(x.data_shape === "matrix")
                            {
                                return (
                                    <MatrixInput
                                        title={x.title}
                                        description={x.description}
                                        id={x.name}
                                        key={x.name}
                                        data_shape={x.data_shape}
                                        data_type={x.data_type}
                                        isOutputMatrix={true}
                                    />
                                );
                            }
                        }));
                        setOpenLoadWheal(false);
                    }
                    else
                    {
                        setOpenLoadWheal(false);
                        setWrongMessage(res.data.errors);
                        setModalTitle("Произошла ошибка!");
                        setGoHomeModal(true);
                        setOpenDialogModal(!openDialogModal);
                    }
                }
            }
            )
            .catch((error) => {
                setOpenLoadWheal(false);
                setWrongMessage(error.message);
                setModalTitle("Произошла ошибка!");
                setOpenDialogModal(!openDialogModal);
            });
    };

    React.useEffect(() => {
        updateAlgorithms();
        loadAlgorithm();
    }, []);

    const redirectToHomePage = (home: Boolean) => {
        if(home) {
            setRedirectToHome(true);
        }
    };

    const isMatrix = (arr) => {
        return Array.isArray(arr) && arr.every(Array.isArray);
    };

    const handleSubmit = (event) => {
        setOpenLoadWheal(true);
        const data = { parameters: [] };
        for (let i = 0; i < event.target.length-1; i++) {
            if(!event.target[i].name.includes("matrix")) {
                if (event.target[i].value !== "on") {
                    if (event.target[i].name === "string|scalar")
                        data.parameters.push({name: event.target[i].id, value: event.target[i].value});
                    else if (event.target[i].name === "float|scalar")
                        data.parameters.push({name: event.target[i].id, value: parseFloat(event.target[i].value)});
                    else if (event.target[i].name === "int|scalar")
                        data.parameters.push({name: event.target[i].id, value: Number(event.target[i].value)});
                    else if (event.target[i].name === "string|list")
                        data.parameters.push({
                            name: event.target[i].id,
                            value: event.target[i].value.replace(" ", "").split(",")
                        });
                    else if (event.target[i].name === "float|list")
                        data.parameters.push({
                            name: event.target[i].id,
                            value: event.target[i].value.replace(" ", "").split(",").map(parseFloat)
                        });
                    else if (event.target[i].name === "int|list")
                        data.parameters.push({
                            name: event.target[i].id,
                            value: event.target[i].value.replace(" ", "").split(",").map(Number)
                        });
                } else
                    data.parameters.push({name: event.target[i].id, value: event.target[i].checked});
            }
            else
            {
                let n = event.target[i].value;
                let m = event.target[i+1].value;
                let skip = n * m * 2 + 1;
                let matrix = [];
                let rowMatrix = [];
                let counter = 0;
                for (let k = i + 2; k < i + 2 + n * m * 2 + 1; k++) {
                    if(counter < m)
                    {
                        counter++;
                        let value;
                        if (event.target[k].name.includes("string"))
                            value = event.target[k].value;
                        if (event.target[k].name.includes("float"))
                            value = parseFloat(event.target[k].value);
                        if (event.target[k].name.includes("int"))
                            value = Number(event.target[k].value);
                        rowMatrix.push(value);
                    }
                    else
                    {
                        k = k - 2;
                        counter = 0;
                        matrix.push(rowMatrix);
                        rowMatrix = [];
                    }
                    k++;
                }
                data.parameters.push({
                    name: event.target[i].name.split("-")[0],
                    value: matrix
                });
                i = i + skip;
            }
        }
        getAlgorithmResult(algorithmParametr, data)
            .then((res) => {
                    if(res !== null) {
                        if(res.data.errors === null) {
                            for (let i = 0; i < res.data.result.outputs.length; i++) {
                                if(typeof res.data.result.outputs[i].value === "boolean") {
                                    document.getElementById(res.data.result.outputs[i].name).checked = res.data.result.outputs[i].value;
                                }
                                else if(!isMatrix(res.data.result.outputs[i].value)){
                                    document.getElementById(res.data.result.outputs[i].name).value = res.data.result.outputs[i].value;
                                }
                                else if(res.data.result.outputs[i].value.length !== 0){
                                    let matrixElement = document.getElementById(res.data.result.outputs[i].name + "-matrix");

                                    let localN = res.data.result.outputs[i].value.length;
                                    let localM = res.data.result.outputs[i].value[0].length;
                                    let nameMatrix = res.data.result.outputs[i].name;

                                    try {
                                        document.getElementById(`${nameMatrix}-matrix-complete`).remove();
                                    }catch (e) {}

                                    let matrixElementLocal = [];
                                    for (let n = 0; n < localN; n++) {
                                        let rows = [];
                                        for (let j = 0; j < localM; j++) {
                                            rows.push(
                                                <div style={{width: "65px", marginRight: "4px"}} key={`${nameMatrix}-${n}-${j}-field-result`}>
                                                    <TextField variant="outlined" size="small" value={res.data.result.outputs[i].value[n][j]} id={`${nameMatrix}-${n}-${j}-field-result`} inputProps={{min: 0, style: { textAlign: 'center' }}} />
                                                </div>
                                            );
                                        }
                                        matrixElementLocal.push(rows);
                                    }
                                    let rowCount = 0;
                                    let matrixLocalElements = matrixElementLocal.map((x) => {
                                        rowCount++;
                                        return (
                                            <div style={{display: "-webkit-box", marginTop: "4px"}} key={`${nameMatrix}-${rowCount}-matrix-row-result`}>
                                                {x}
                                            </div>
                                        );
                                    });

                                    let matrixResultComplete = (
                                        <div id={`${nameMatrix}-matrix-complete`}>
                                            {matrixLocalElements}
                                        </div>
                                    );

                                    const rootElement = ReactDOM.createRoot(matrixElement);
                                    rootElement.render(matrixResultComplete);
                                }
                            }
                            setOpenLoadWheal(false);
                        }
                        else
                        {
                            setOpenLoadWheal(false);
                            setWrongMessage(res.data.errors);
                            setModalTitle("Произошла ошибка!");
                            if(res.data.errors.includes("Алгоритм с именем"))
                                setGoHomeModal(true);
                            setOpenDialogModal(!openDialogModal);
                        }
                    }
                }
            )
            .catch((error) => {
                setOpenLoadWheal(false);
                if(error.message === "Request failed with status code 422")
                    setWrongMessage("Заполните все поля в матрице!");
                else
                    setWrongMessage(error.message);
                setModalTitle("Произошла ошибка!");
                setOpenDialogModal(!openDialogModal);
            });
    };

    const [openLoadWheal, setOpenLoadWheal] = React.useState(false);

  return (
      <>
          <div>
              <Backdrop
                  sx={{ color: '#fff', zIndex: 2000 }}
                  open={openLoadWheal}
              >
                  <CircularProgress color="inherit" />
              </Backdrop>
          </div>
          <div>
              {openDialogModal && (
                  <ModalWindowDialog
                      title={modalTitle}
                      message={wrongMessage}
                      onClose={(home: Boolean) => {setOpenDialogModal(!openDialogModal); redirectToHomePage(home);}}
                      isActive={openDialogModal}
                      goHome={goHomeModal}
                  />
              )}
          </div>
          <div style={{display: "flex", marginTop: "30px"}}>
              {redirectToHome && (<Navigate to="/" />) }
              <div style={{maxWidth: "25%", margin: "5px"}}>
                  <h4 style={{fontWeight: "bold", cursor: "pointer"}} onClick={() => {window.location.href = "#";}}>Главная</h4>
                  <Divider style={{marginBottom: "10px"}}></Divider>
                  <div style={{display: "grid"}}>
                      {algorithmsHaving === "" && (<p>Готовим калькуляторы...</p>)}
                      {algorithmsHaving !== "" && algorithmsHaving}
                  </div>
              </div>
              <div style={{maxWidth: "75%", margin: "5px", width: "100%"}}>
                  <div style={{marginLeft: "25px"}}>
                      <h3>{algorithmTitle}</h3>
                      <p>{algorithmDescription}</p>
                  </div>
                  <div>
                      <Container style={{marginTop: "10px", paddingRight: "0px"}}>
                          <Box sx={{ bgcolor: "#F6F6F6", padding: "15px"}}>
                            <form onSubmit={(event) => {event.preventDefault(); handleSubmit(event)}}>
                                <div>
                                    {algorithmParametrs}
                                </div>
                                <Button variant="contained" type="submit" style={{marginTop: "15px"}}>Получить результат</Button>
                            </form>
                          </Box>
                      </Container>
                  </div>
                  <div>
                      <Container style={{marginTop: "10px", paddingRight: "0px"}}>
                          <Box sx={{ bgcolor: "#AFB4C1", padding: "15px"}}>
                              {algorithmOutputs}
                          </Box>
                      </Container>
                  </div>
                  <div style={{textAlign: "right", marginTop: "40px", marginBottom: "20px"}}>
                      <p>Поделиться страницей в социальных сетях:</p>
                      <div>
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <a href={`https://t.me/share/url?url=${host}/algorithm?alg=${algorithmParametr}&text=Онлайн кальуляторы OMMAT.ru - ${algorithmTitle}`} target="_blank">
                              <img src={telegramIcon} alt="Телеграм" style={{marginRight: "10px"}} />
                          </a>
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <a href={`https://vk.com/share.php?url=${host}/algorithm?alg=${algorithmParametr}&title=Онлайн кальуляторы OMMAT.ru - ${algorithmTitle}&noparse=true&image=${host}${ourLogo}`} target="_blank">
                              <img src={vkIcon} alt="ВКонтакте"/>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
};
