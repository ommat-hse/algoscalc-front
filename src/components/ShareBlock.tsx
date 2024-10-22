import React from "react";
import telegramIcon from "../assets/images/telegram.png";
import vkIcon from "../assets/images/vk.png";

type ShareBlockProps = {
  telegramUrl?: string;
  vkUrl?: string;
};

const ShareBlock: React.FC<ShareBlockProps> = ({
  telegramUrl,
  vkUrl,
}: ShareBlockProps) => {
  return (
    <>
      <div
        style={{
          textAlign: "right",
          marginTop: "20px",
        }}
      >
        <p>Поделиться страницей в социальных сетях:</p>
        <div>
          <a
            href={`https://t.me/share/url?url=${telegramUrl}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={telegramIcon}
              alt="Телеграм"
              style={{ marginRight: "10px" }}
            />
          </a>
          <a
            href={`https://vk.com/share.php?url=${vkUrl}`}
            target="_blank"
            rel="noreferrer"
          >
            <img src={vkIcon} alt="ВКонтакте" />
          </a>
        </div>
      </div>
    </>
  );
};

export default ShareBlock;
