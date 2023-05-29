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
import {TextField} from "@mui/material";
import ModalWindowDialog from "./ModalWindow/ModalWindowDialog";
import BooleanInput from "./controls/BooleanInput/BooleanInput";

export const Algorithm = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const algorithmParametr = queryParameters.get("alg");

    const [openDialogModal, setOpenDialogModal] = React.useState(false);
    const [goHomeModal, setGoHomeModal] = React.useState(false);
    const [wrongMessage, setWrongMessage] = React.useState("");

    const [algorithmTitle, setAlgorithmTitle] = React.useState("Загружаем алгоритм...");
    const [algorithmDescription, setAlgorithmDescription] = React.useState("Загружаем алгоритм...");
    const [redirectToHome, setRedirectToHome] = React.useState(false);

    const [algorithmsHaving, setAlgorithmsHaving] = React.useState("");

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
                setOpenDialogModal(!openDialogModal);
            });
    };

    const loadAlgorithm = () => {
        getAlgorithmDescription(algorithmParametr)
            .then((res) => {
                    if(res !== null) {
                        if(res.data.errors === null) {
                            setAlgorithmTitle(res.data.result.title);
                            setAlgorithmDescription(res.data.result.description);
                        }
                        else
                        {
                            setWrongMessage(res.data.errors);
                            setGoHomeModal(true);
                            setOpenDialogModal(!openDialogModal);
                        }
                    }
                }
            )
            .catch((error) => {
                setWrongMessage(error.message);
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
                      title="Произошла ошибка!"
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
                              <div><b>Средний расход топлива (л/100км)</b></div>
                              <TextField fullWidth id="outlined-basic" label="Введите неотрицательное вещественное число" variant="outlined" style={{marginTop: "5px"}} />
                              <div style={{marginTop: "5px"}}><b>Стоимость 1 л. топлива (руб)</b></div>
                              <TextField fullWidth id="outlined-basic" label="Введите неотрицательное вещественное число" variant="filled" style={{marginTop: "5px"}} />
                              <div style={{marginTop: "5px"}}><b>Сколько хотите проехать</b></div>
                              <TextField fullWidth id="outlined-basic" label="Введите неотрицательное вещественное число" variant="standard" style={{marginTop: "5px"}} />
                              <BooleanInput
                                  description="При проставлении отметки объем и стоимость будут округлены до целого"
                                  title="Округлять результат"
                                  isRequired={true}
                                  id="need_round"
                              />
                          </Box>
                      </Container>
                  </div>
                  <div>
                      <Container style={{marginTop: "10px", paddingRight: "0px"}}>
                          <Box sx={{ bgcolor: "#AFB4C1", padding: "15px"}}>
                              <div><b>Средний расход топлива (л/100км)</b></div>
                              <TextField fullWidth id="outlined-basic" label="Введите неотрицательное вещественное число" variant="outlined" style={{marginTop: "5px"}} />
                              <div style={{marginTop: "5px"}}><b>Стоимость 1 л. топлива (руб)</b></div>
                              <TextField fullWidth id="outlined-basic" label="Введите неотрицательное вещественное число" variant="filled" style={{marginTop: "5px"}} />
                              <div style={{marginTop: "5px"}}><b>Сколько хотите проехать</b></div>
                              <TextField fullWidth id="outlined-basic" label="Введите неотрицательное вещественное число" variant="standard" style={{marginTop: "5px"}} />
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
