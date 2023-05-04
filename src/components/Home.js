import React from "react";
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import calculatorImg from "./img/Calculator.png";
import telegramIcon from "./img/Telegram.png";
import vkIcon from "./img/VK.png";

export const Home = () => {

  return (
      <div style={{display: "flex", marginTop: "30px"}}>
          <div style={{maxWidth: "25%", margin: "5px"}}>
              <h4 style={{fontWeight: "bold"}}>Главная</h4>
              <Divider style={{marginBottom: "10px"}}></Divider>
              <div style={{display: "grid"}}>
                  <p>
                      <Link href="#" underline="hover" color="#46484D">Определитель матрицы</Link>
                  </p>
                  <p>
                      <Link href="#" underline="hover" color="#46484D">Числа Фибоначчи</Link>
                  </p>
                  <p>
                      <Link href="#" underline="hover" color="#46484D">НОД и НОК двух чисел</Link>
                  </p>
                  <p>
                      <Link href="#" underline="hover" color="#46484D">Расход топлива</Link>
                  </p>
                  <p>
                      <Link href="#" underline="hover" color="#46484D">Проверка числа на простоту</Link>
                  </p>
                  <p>
                      <Link href="#" underline="hover" color="#46484D">Проверка ряда чисел на совершенность</Link>
                  </p>
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
              <div style={{marginTop: "40px"}}>
                  <Box
                      sx={{
                          display: 'grid',
                          gap: 2,
                          gridTemplateColumns: 'repeat(3, 1fr)',
                      }}
                  >
                      <Container style={{marginTop: "10px", paddingRight: "0px"}}>
                          <Box sx={{ bgcolor: "#F6F6F6", padding: "15px", border: 1, width: "240px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                              <p style={{fontWeight: "bold", textAlign: "center"}}>Онлайн кальуляторы</p>
                          </Box>
                      </Container>
                      <Container style={{marginTop: "10px", paddingRight: "0px"}}>
                          <Box sx={{ bgcolor: "#F6F6F6", padding: "15px", border: 1, width: "240px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                              <p style={{fontWeight: "bold", textAlign: "center"}}>Числа Фибоначчи</p>
                          </Box>
                      </Container>
                      <Container style={{marginTop: "10px", paddingRight: "0px"}}>
                          <Box sx={{ bgcolor: "#F6F6F6", padding: "15px", border: 1, width: "240px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                              <p style={{fontWeight: "bold", textAlign: "center"}}>НОД и НОК двух чисел</p>
                          </Box>
                      </Container>
                      <Container style={{marginTop: "10px", paddingRight: "0px"}}>
                          <Box sx={{ bgcolor: "#F6F6F6", padding: "15px", border: 1, width: "240px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                              <p style={{fontWeight: "bold", textAlign: "center"}}>Расход топлива для поездки на заданное расстояние</p>
                          </Box>
                      </Container>
                      <Container style={{marginTop: "10px", paddingRight: "0px"}}>
                          <Box sx={{ bgcolor: "#F6F6F6", padding: "15px", border: 1, width: "240px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                              <p style={{fontWeight: "bold", textAlign: "center"}}>Проверка числа на простоту</p>
                          </Box>
                      </Container>
                      <Container style={{marginTop: "10px", paddingRight: "0px"}}>
                          <Box sx={{ bgcolor: "#F6F6F6", padding: "15px", border: 1, width: "240px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                              <p style={{fontWeight: "bold", textAlign: "center"}}>Проверка рядя чисел на совершенность</p>
                          </Box>
                      </Container>
                      <Container style={{marginTop: "10px", paddingRight: "0px"}}>
                          <Box sx={{ bgcolor: "#F6F6F6", padding: "15px", border: 1, width: "240px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                              <p style={{fontWeight: "bold", textAlign: "center"}}>Онлайн кальуляторы</p>
                          </Box>
                      </Container>
                      <Container style={{marginTop: "10px", paddingRight: "0px"}}>
                          <Box sx={{ bgcolor: "#F6F6F6", padding: "15px", border: 1, width: "240px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                              <p style={{fontWeight: "bold", textAlign: "center"}}>Числа Фибоначчи</p>
                          </Box>
                      </Container>
                      <Container style={{marginTop: "10px", paddingRight: "0px"}}>
                          <Box sx={{ bgcolor: "#F6F6F6", padding: "15px", border: 1, width: "240px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                              <p style={{fontWeight: "bold", textAlign: "center"}}>НОД и НОК двух чисел</p>
                          </Box>
                      </Container>
                  </Box>
              </div>
              <div>
                  <Container style={{marginTop: "40px", paddingRight: "0px"}}>
                      <Box sx={{ bgcolor: "#F6F6F6", padding: "15px"}}>
                          <h1 style={{fontWeight: "bold", textAlign: "center"}}>Простой калькулятор</h1>
                          <div style={{textAlign: "center"}}>
                              <p>Очень простой калькулятор - ничего лишнего: сложение, вычитание, умножение деление</p>
                          </div>
                          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                              <img src={calculatorImg} alt="Простой калькулятор"/>
                          </div>
                      </Box>
                  </Container>
              </div>
              <div style={{textAlign: "right", marginTop: "40px", marginBottom: "20px"}}>
                  <p>Поделиться страницей в социальных сетях:</p>
                  <div>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a href="#">
                          <img src={telegramIcon} alt="Телеграм" style={{marginRight: "10px"}} />
                      </a>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a href="#">
                          <img src={vkIcon} alt="ВКонтакте"/>
                      </a>
                  </div>
              </div>
          </div>
      </div>
  );
};
