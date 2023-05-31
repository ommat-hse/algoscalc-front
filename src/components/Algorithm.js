import React from "react";
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom';
import {getAlgorithms, getAlgorithmDescription, host} from "../Api";
import telegramIcon from "./img/Telegram.png";
import vkIcon from "./img/VK.png";
import ourLogo from "./img/Logo.png";
import Button from '@mui/material/Button';
import ModalWindowDialog from "./ModalWindow/ModalWindowDialog";
import BooleanInput from "./controls/BooleanInput/BooleanInput";
import ScalarInput from "./controls/ScalarInput/ScalarInput";
import MatrixInput from "./controls/MatrixInput/MatrixInput";

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
                }
            )
            .catch((error) => {
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
        data_shape: string
    }

    const loadAlgorithm = () => {
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
                                            description={"Пока не могу нарисовать матрицу, но усердно пытаюсь ее спроектировать. У меня лапки ༼ つ ◕_◕ ༽つ"}
                                            id={x.name}
                                            key={x.name}
                                        />
                                    );
                                }
                            }));
                            setAlgorithmOutputs(res.data.result.outputs.map((x: IOutputs) => {
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
                                            isDisabeld={true}
                                        />
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
                                            description={"Пока не могу нарисовать матрицу, но усердно пытаюсь ее спроектировать. У меня лапки ༼ つ ◕_◕ ༽つ"}
                                            id={x.name}
                                            key={x.name}
                                        />
                                    );
                                }
                            }));
                        }
                        else
                        {
                            setWrongMessage(res.data.errors);
                            setModalTitle("Произошла ошибка!");
                            setGoHomeModal(true);
                            setOpenDialogModal(!openDialogModal);
                        }
                    }
                }
            )
            .catch((error) => {
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

  return (
      <>
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
                              <div>
                                  {algorithmParametrs}
                              </div>
                              <Button variant="contained" style={{marginTop: "15px"}} onClick={() => {setWrongMessage("Пока не могу, но усердно учусь этому ремеслу. У меня лапки ༼ つ ◕_◕ ༽つ"); setModalTitle("Ой..."); setOpenDialogModal(!openDialogModal);}}>Получить результат</Button>
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
