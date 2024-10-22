import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type SelectControlProps = {
  id: string;
  labelText?: string;
  value: number;
  callback?: (event: SelectChangeEvent<number>) => void;
};

const SelectControl: React.FC<SelectControlProps> = ({
  id,
  labelText,
  value,
  callback,
}: SelectControlProps) => {
  const menuItems = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => {
    return <MenuItem value={val}>{val}</MenuItem>;
  });

  return (
    <>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id={`${id}-label`}>{labelText}</InputLabel>
        <Select
          labelId="select-label"
          value={value}
          onChange={callback}
          inputProps={{ id: id }}
        >
          {menuItems}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectControl;
