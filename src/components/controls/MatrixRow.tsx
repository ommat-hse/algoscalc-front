import * as React from "react";

type MatrixRowProps = {
  id?: string;
  rowIdx?: number;
  children?: React.ReactNode;
};

const MatrixRow: React.FC<MatrixRowProps> = ({
  id,
  rowIdx,
  children,
}: MatrixRowProps) => {
  return (
    <>
      <div
        style={{ display: "-webkit-box", marginTop: "4px" }}
        key={`${id}-${rowIdx}-row`}
      >
        {children}
      </div>
    </>
  );
};

export default MatrixRow;
