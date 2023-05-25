import React from "react";
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {getAlgorithms} from "../Api";

export const Algorithm = () => {

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

    React.useEffect(() => {
        updateAlgorithms();
    }, []);

  return (
      <div style={{display: "flex", marginTop: "30px"}}>
          <div style={{maxWidth: "25%", margin: "5px"}}>
              <h4 style={{fontWeight: "bold", cursor: "pointer"}} onClick={() => {window.location.href = "#";}}>Главная</h4>
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
                          <h1 style={{fontWeight: "bold"}}>Онлайн кальуляторы</h1>
                          <div style={{textAlign: "justify"}}>
                            <p>OMMAT.ru - бесплатный сервис онлайн-калькуляторов. С помощью нашего сервиса Вы сможете без регистрации и прочих проверок быстро и точно произвести необходимые вычисления. Мы постоянно работаем над улучшением предоставляемого Вам сервиса и созданием новых калькуляторов, чтобы каждый пользователь смог оперативно и максимально точно произвести нужные расчеты. Мы прилагаем много усилий для улучшения нашего сервиса и искренне надеемся, что с помощью представленных онлайн-калькуляторов Вы смогли решить поставленные перед Вами задачи. Если Вам понравился наш сервис онлайн-калькуляторов, то добавляйте его в закладки и расскажите про него друзьям через Вашу социальную сеть.</p>
                          </div>
                      </Box>
                  </Container>
              </div>
              <div>
                  <Container style={{marginTop: "10px", paddingRight: "0px"}}>
                      <Box sx={{ bgcolor: "#F6F6F6", padding: "15px", border: 1}}>
                          <h1 style={{fontWeight: "bold"}}>Lorem ipsum</h1>
                          <div style={{textAlign: "justify"}}>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                          </div>
                      </Box>
                  </Container>
              </div>
          </div>
      </div>
  );
};
