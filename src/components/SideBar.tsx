import React from "react";
import { getAlgorithms } from "../api/algorithms";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import { IBaseEntity } from "../api";

const SideBar: React.FC = () => {
  const [algorithmsHaving, setAlgorithmsHaving] = React.useState<JSX.Element[]>(
    [],
  );

  const updateAlgorithms = () => {
    getAlgorithms()
      .then((res) => {
        setAlgorithmsHaving(
          res.items.map((x: IBaseEntity) => (
            <p key={`alg-${x.name}`}
            style={{
              marginLeft: "25px"
            }}>
              <Link
                href={`/algorithm?name=${x.name}`}
                underline="hover"
                color="#46484D"
                id={`alg-${x.name}`}
              >
                {x.title}
              </Link>
            </p>
          )),
        );
      })
      .catch((error) => {
        alert(error);
      });
  };

  React.useEffect(() => {
    updateAlgorithms();
  }, []);

  return (
    <>
      <h2
        style={{
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: "5px",
          marginBottom: "10px",
          marginLeft: "10px"
        }}
      >
        <Link
          href={"/"}
          underline="hover"
          color="#46484D"
        >
          Главная
        </Link>
      </h2>
      <Divider />
      <div style={{ marginRight: "10px" }}>
        {algorithmsHaving.length === 0 && <p>Готовим калькуляторы...</p>}
        {algorithmsHaving.length > 0 && algorithmsHaving}
      </div>
    </>
  );
};

export default SideBar;
