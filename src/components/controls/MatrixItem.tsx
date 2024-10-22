import TextField from "@mui/material/TextField";
import * as React from "react";

type MatrixItemProps = {
  id: string;
  value?: string;
};

const MatrixItem: React.FC<MatrixItemProps> = ({
  id,
  value,
}: MatrixItemProps) => {
  return (
    <>
      <div style={{ width: "100px", marginRight: "4px" }} key={id}>
        <TextField
          variant="outlined"
          size="small"
          value={value}
          id={id}
          inputProps={{
            style: { textAlign: "center" },
          }}
        />
      </div>
    </>
  );
};

export default MatrixItem;
