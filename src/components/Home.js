import React from "react";
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import calculatorImg from "./img/Calculator.png";
import telegramIcon from "./img/Telegram.png";
import vkIcon from "./img/VK.png";
import ourLogo from "./img/Logo.png"
import {getAlgorithms, host} from "../Api";

export const Home = () => {

    const [algorithmsHaving, setAlgorithmsHaving] = React.useState("");
    const [algorithmsCards, setAlgorithmsCards] = React.useState("");

    const handleClickOnCard = (link) => {
        window.location.href = link;
    };

    const updateAlgorithms = () => {
        getAlgorithms()
            .then((res) => {
                if(res !== null) {
                    let arrNineCards = [];
                    for (let i = 0; i < res.data.algorithms.length && i < 9; i++) {
                        arrNineCards.push(res.data.algorithms[i]);
                    }
                    setAlgorithmsHaving(res.data.algorithms.map((x) => (
                            <p key={`alg-${x.name}`}>
                                <Link href={`/algorithm?alg=${x.name}`} underline="hover" color="#46484D"
                                      id={`alg-${x.name}`}>{x.title}</Link>
                            </p>
                        )
                    ));
                    setAlgorithmsCards(arrNineCards.map((x) => (
                            <Container key={`card-alg-${x.name}`} style={{marginTop: "10px", paddingRight: "0px", cursor: "pointer"}} onClick={() =>  handleClickOnCard(`/algorithm?alg=${x.name}`)}>
                                <Box sx={{ bgcolor: "#F6F6F6", padding: "15px", border: 1, width: "240px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <p style={{fontWeight: "bold", textAlign: "center"}}>{x.title}</p>
                                </Box>
                            </Container>
                        )
                    ));
                }
            }
            )
            .catch((error) => {
                alert(error);
            });
    };

    React.useEffect(() => {
        updateAlgorithms();
    }, []);

  return (
      <div style={{display: "flex", marginTop: "30px"}}>
          <div style={{maxWidth: "25%", margin: "5px"}}>
              <h4 style={{fontWeight: "bold"}}>Главная</h4>
              <Divider style={{marginBottom: "10px"}}></Divider>
              <div style={{display: "grid"}}>
                  {algorithmsHaving === "" && (<p>Готовим калькуляторы...</p>)}
                  {algorithmsHaving !== "" && algorithmsHaving}
              </div>
          </div>
          <div style={{maxWidth: "75%", margin: "5px"}}>
              <div>
                  <Container style={{marginTop: "10px", paddingRight: "0px"}}>
                      <Box sx={{ bgcolor: "#F6F6F6", padding: "15px", border: 1}}>
                          <h1 style={{fontWeight: "bold"}}>Онлайн калькуляторы</h1>
                          <div style={{textAlign: "justify"}}>
                            <p>OMMAT.ru - бесплатный сервис онлайн-калькуляторов. С помощью нашего сервиса Вы сможете без регистрации и прочих проверок быстро и точно произвести необходимые вычисления. Мы постоянно работаем над улучшением предоставляемого Вам сервиса и созданием новых калькуляторов, чтобы каждый пользователь смог оперативно и максимально точно произвести нужные расчеты. Мы прилагаем много усилий для улучшения нашего сервиса и искренне надеемся, что с помощью представленных онлайн-калькуляторов Вы смогли решить поставленные перед Вами задачи. Если Вам понравился наш сервис онлайн-калькуляторов, то добавляйте его в закладки и расскажите про него друзьям через Вашу социальную сеть.</p>
                          </div>
                      </Box>
                  </Container>
              </div>
              <div style={{marginTop: "40px"}}>
                  <Box
                      sx={{
                          display: 'grid',
                          gap: 2,
                          gridTemplateColumns: 'repeat(3, 1fr)',
                      }}
                  >
                      {algorithmsCards === "" && (<p>Готовим калькуляторы...</p>)}
                      {algorithmsCards !== "" && algorithmsCards}
                  </Box>
              </div>
              <div style={{textAlign: "right", marginTop: "40px", marginBottom: "20px"}}>
                  <p>Поделиться страницей в социальных сетях:</p>
                  <div>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a href={`https://t.me/share/url?url=${host}&text=Онлайн кальуляторы OMMAT.ru`} target="_blank">
                          <img src={telegramIcon} alt="Телеграм" style={{marginRight: "10px"}} />
                      </a>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a href={`https://vk.com/share.php?url=${host}&title=Онлайн кальуляторы OMMAT.ru&noparse=true&image=${host}${ourLogo}`} target="_blank">
                          <img src={vkIcon} alt="ВКонтакте"/>
                      </a>
                  </div>
              </div>
          </div>
      </div>
  );
};
