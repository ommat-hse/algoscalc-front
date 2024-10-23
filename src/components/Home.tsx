import React from "react";
import { getAlgorithms } from "../api/algorithms";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import config from "../config";
import ourLogo from "../assets/images/logo.png";
import { IBaseEntity } from "../api";
import ShareBlock from "./ShareBlock";

const Home: React.FC = () => {
  const [algorithmsCards, setAlgorithmsCards] = React.useState<JSX.Element[]>(
    [],
  );

  const handleClickOnCard = (link: string) => {
    window.location.href = link;
  };

  const getCards = (algorithms: IBaseEntity[]) => {
    return algorithms.map((x: IBaseEntity) => (
      <Container
        key={`card-alg-${x.name}`}
        style={{
          display: "flex",
          cursor: "pointer",
        }}
        onClick={() => handleClickOnCard(`/algorithm?alg=${x.name}`)}
      >
        <Box
          sx={{
            bgcolor: "#F6F6F6",
            padding: "15px",
            border: 1,
            width: "300px",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontWeight: "bold", textAlign: "center" }}>
            {x.title}
          </p>
        </Box>
      </Container>
    ));
  };

  const updateAlgorithms = () => {
    getAlgorithms()
      .then((res) => {
        let arrNineCards = [];
        for (let i = 0; i < res.length && i < 9; i++) {
          arrNineCards.push(res[i]);
        }
        setAlgorithmsCards(getCards(arrNineCards));
      })
      .catch((error) => {
        alert(error);
      });
  };

  React.useEffect(() => {
    updateAlgorithms();
  }, []);

  const telegramUrl = `${config.appHost}&text=Онлайн калькуляторы OMMAT.ru`;
  const vkUrl = `${config.appHost}&title=Онлайн калькуляторы OMMAT.ru&noparse=true&image=${config.appHost}${ourLogo}`;

  return (
    <>
      <Container
        style={{
          marginLeft: "inherit",
          marginRight: "0",
          marginTop: "10px",
        }}
      >
        <Container>
          <Box
            sx={{
              bgcolor: "#F6F6F6",
              padding: "15px",
              border: 1,
              marginBottom: "30px",
            }}
          >
            <h1
              style={{
                fontWeight: "bold",
                marginTop: "0",
                marginBottom: "0",
              }}
            >
              Онлайн калькуляторы
            </h1>
            <div style={{ textAlign: "justify" }}>
              <p>
                OMMAT.ru - бесплатный сервис онлайн-калькуляторов. С помощью
                нашего сервиса Вы сможете без регистрации и прочих проверок
                быстро и точно произвести необходимые вычисления. Мы постоянно
                работаем над улучшением предоставляемого Вам сервиса и созданием
                новых калькуляторов, чтобы каждый пользователь смог оперативно и
                максимально точно произвести нужные расчеты. Мы прилагаем много
                усилий для улучшения нашего сервиса и искренне надеемся, что с
                помощью представленных онлайн-калькуляторов Вы смогли решить
                поставленные перед Вами задачи. Если Вам понравился наш сервис
                онлайн-калькуляторов, то добавляйте его в закладки и расскажите
                про него друзьям через Вашу социальную сеть.
              </p>
            </div>
          </Box>
        </Container>
        <Container>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, 300px)",
              gap: "30px",
              justifyContent: "space-around",
            }}
          >
            {!algorithmsCards && <p>Готовим калькуляторы...</p>}
            {algorithmsCards.length > 0 && algorithmsCards}
          </Box>
        </Container>
        <ShareBlock telegramUrl={telegramUrl} vkUrl={vkUrl} />
      </Container>
    </>
  );
};

export default Home;
