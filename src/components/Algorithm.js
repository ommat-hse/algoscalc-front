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

export const Algorithm = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const algorithmParametr = queryParameters.get("alg");
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
                alert(error);
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
                            alert(res.data.errors);
                            setRedirectToHome(true);
                        }
                    }
                }
            )
            .catch((error) => {
                alert(error);
            });
    };

    React.useEffect(() => {
        updateAlgorithms();
        loadAlgorithm();
    }, []);

  return (
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
                          <TextField fullWidth id="outlined-basic" label="Введите неотрицательное вещественное число" variant="outlined" style={{marginTop: "5px"}} />
                          <div style={{marginTop: "5px"}}><b>Сколько хотите проехать</b></div>
                          <TextField fullWidth id="outlined-basic" placeholder="Введите неотрицательное вещественное число" variant="outlined" style={{marginTop: "5px"}} />
                          <div style={{marginTop: "5px"}}><b>Тестовое поле</b></div>
                          <TextField fullWidth id="outlined-basic" placeholder="Тестовая подсказка" variant="outlined" style={{marginTop: "5px"}} />
                      </Box>
                  </Container>
              </div>
              <div>
                  <Container style={{marginTop: "10px", paddingRight: "0px"}}>
                      <Box sx={{ bgcolor: "#AFB4C1", padding: "15px"}}>

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
  );
};
