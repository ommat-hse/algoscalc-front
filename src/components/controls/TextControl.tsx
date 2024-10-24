import * as React from "react";
import TextField, { TextFieldVariants } from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

type TextControlProps = {
  id?: string;
  title?: string;
  description?: string;
  disabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  variant?: TextFieldVariants;
  value?: string;
};

const TextControl: React.FC<TextControlProps> = ({
  id,
  title,
  description,
  disabled,
  value,
  isRequired,
  variant,
  isReadOnly,
}: TextControlProps) => {
  return (
    <>
      <div style={{ fontWeight: "700", marginTop: "5px" }}>{title}</div>
      <Tooltip title={isReadOnly && description} arrow placement="left">
        <TextField
          id={id}
          label={!isReadOnly && description}
          disabled={disabled}
          value={value}
          fullWidth={true}
          variant={variant}
          required={isRequired}
          style={{ marginTop: "5px" }}
          slotProps={{
            input: {
              readOnly: isReadOnly,
            },
          }}
        />
      </Tooltip>
    </>
  );
};

export default TextControl;
