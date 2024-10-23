import * as React from "react";
import MatrixItem from "./controls/MatrixItem";
import MatrixRow from "./controls/MatrixRow";

type MatrixProps = {
  id?: string;
  value?: any;
};

const Matrix: React.FC<MatrixProps> = ({
  id,
  value,
}: MatrixProps) => {
  const rowCnt = value.length;
  const colCnt = rowCnt > 0 ? value[0].length : 0;

  let rows = [];
  for (let i = 0; i < rowCnt; i++) {
    let row = [];
    for (let j = 0; j < colCnt; j++) {
      row.push(
        <MatrixItem
          id={`${id}-${i}-${j}`}
          value={value[i][j]}
        />,
      );
    }
    rows.push(row);
  }

  return (
    <div id={`${id}-completed`}>
      {rows.map((row, rowIdx) => {
        return (
          <MatrixRow id={id} rowIdx={rowIdx} key={`${id}-${rowIdx}-row`}>
            {row}
          </MatrixRow>
        );
      })}
  </div>
  );
};

export default Matrix;
