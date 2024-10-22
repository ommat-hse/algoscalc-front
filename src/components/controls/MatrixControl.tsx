import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import SelectControl from "./SelectControl";
import { SelectChangeEvent } from "@mui/material/Select";
import MatrixItem from "./MatrixItem";
import MatrixRow from "./MatrixRow";

type MatrixControlProps = {
  id?: string;
  title?: string;
  description?: string;
};

const MatrixControl: React.FC<MatrixControlProps> = ({
  id,
  title,
  description,
}: MatrixControlProps) => {
  const [rowCnt, setRowCnt] = React.useState(3);
  const [colCnt, setColCnt] = React.useState(3);
  const [matrixElements, setMatrixElements] = React.useState<JSX.Element[]>([]);

  const handleChangeRow = (event: SelectChangeEvent<number>) => {
    setRowCnt(Number(event.target.value));
  };

  const handleChangeColumn = (event: SelectChangeEvent<number>) => {
    setColCnt(Number(event.target.value));
  };

  React.useEffect(() => {
    let rows = [];
    for (let i = 0; i < rowCnt; i++) {
      let row = [];
      for (let j = 0; j < colCnt; j++) {
        row.push(<MatrixItem id={`${id}-${i}-${j}`} />);
      }
      rows.push(row);
    }
    setMatrixElements(
      rows.map((row, rowIdx) => {
        return (
          <MatrixRow id={id} rowIdx={rowIdx}>
            {row}
          </MatrixRow>
        );
      }),
    );
  }, [rowCnt, colCnt]);

  return (
    <>
      <Tooltip title={description} arrow placement="left">
        <div>
          <div style={{ fontWeight: "700", marginTop: "5px" }}>{title}</div>
          <div style={{ display: "flex" }}>
            <div>
              <div style={{ fontWeight: "700", marginTop: "5px" }}>
                Размер матрицы
              </div>
              <Box
                sx={{
                  border: 1,
                  borderRadius: 5,
                  padding: "5px",
                  display: "inline-block",
                }}
              >
                <div style={{ display: "flex" }}>
                  <SelectControl
                    id={`${id}-select-row`}
                    labelText="Строки"
                    value={rowCnt}
                    callback={handleChangeRow}
                  />
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "20px",
                      marginTop: "20px",
                    }}
                  >
                    X
                  </div>
                  <SelectControl
                    id={`${id}-select-column`}
                    labelText="Столбцы"
                    value={colCnt}
                    callback={handleChangeColumn}
                  />
                </div>
              </Box>
            </div>
            <div style={{ marginTop: "25px", marginLeft: "10px" }}>
              {matrixElements}
            </div>
          </div>
        </div>
      </Tooltip>
    </>
  );
};

export default MatrixControl;
