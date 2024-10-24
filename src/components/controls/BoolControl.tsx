import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";

type BoolControlProps = {
  id?: string;
  title?: string;
  description?: string;
  checked?: boolean;
  disabled?: boolean;
};

const BoolControl: React.FC<BoolControlProps> = ({
  id,
  title,
  description,
  checked,
  disabled,
}: BoolControlProps) => {
  return (
    <Tooltip title={description} arrow placement="left">
      <FormControlLabel
        control={
          <input
            id={id}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            style={{ margin: "0.4rem" }}
          />
        }
        label={title}
      />
    </Tooltip>
  );
};

export default BoolControl;
