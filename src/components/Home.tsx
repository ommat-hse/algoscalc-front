import React from "react";
import { getAlgorithms } from "../api/algorithms";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import config from "../config";
import ourLogo from "../assets/images/logo.png";
import { IBaseEntity } from "../api";
import ShareBlock from "./ShareBlock";
import Button from "@mui/material/Button";

const Home: React.FC = () => {
  const [algorithmsCards, setAlgorithmsCards] = React.useState<JSX.Element[]>(
    [],
  );
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);

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
        onClick={() => handleClickOnCard(`/algorithm?name=${x.name}`)}
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

  const updateAlgorithms = (curPage=1) => {
    getAlgorithms(curPage, 6)
      .then((res) => {
        setPages(res.pages)
        setAlgorithmsCards(getCards(res.items));
      })
      .catch((error) => {
        alert(error);
      });
  };

  React.useEffect(() => {
    updateAlgorithms();
  }, []);

  const prevPageHandler = () => {
    updateAlgorithms(page - 1);
    setPage(page - 1);
  }

  const nextPageHandler = () => {
    updateAlgorithms(page + 1);
    setPage(page + 1);
  }

  const telegramUrl = `${config.appHost}&text=Онлайн калькуляторы OMMAT.ru`;
  const vkUrl = `${config.appHost}&title=Онлайн калькуляторы OMMAT.ru&noparse=true&image=${config.appHost}${ourLogo}`;

  return (
    <div
      style={{
        marginLeft: "100px",
        marginRight: "100px",
        marginTop: "10px",
        display: "grid",
        minHeight: "100%",
        gridTemplateRows: "1fr auto",
        gridTemplateColumns: "100%",
      }}
    >
      <div>
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
              <p style={{lineHeight: "1.5"}}>
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
        <div>
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
        </div>
      </div>
      <div  style={{ display: "flex" }}>
        <div style={{ display: "flex", width: "50%", marginTop: "20px", }}>
          <Button
            variant="contained"
            style={{ width: "50px", height: "50px" }}
            disabled={page <= 1}
            onClick={prevPageHandler}
            >
              {"<<"}
          </Button>
          <Box
          sx={{
            bgcolor: "#F6F6F6",
            marginLeft: "5px",
            marginRight: "5px",
            border: 1,
            width: "50px",
            height: "50px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontWeight: "bold", textAlign: "center" }}>
            {page}
          </p>
        </Box>
          <Button
            variant="contained"
            style={{ width: "50px", height: "50px" }}
            disabled={page >= pages}
            onClick={nextPageHandler}
            >
              {">>"}
          </Button>
        </div>
        <div style={{ width: "50%", marginBottom: "10px"}}>
          <ShareBlock telegramUrl={telegramUrl} vkUrl={vkUrl} />
        </div>
      </div>
    </div>
  );
};

export default Home;
