
// Libraries
import * as React from 'react';

// Components
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// Types
type MatrixInputTypes = {
    description?: string;
    title?: string;
    callback?: () => void;
    isDisabeld?: boolean;
    isFullWidth?: boolean;
    variant?: string;
    isRequired?: boolean;
    value?: string;
    id?: string;
    data_shape?: string;
    data_type?: string;
    isOutputMatrix?: boolean;
};

const MatrixInput = ({ description, title, isDisabeld, value, isFullWidth, isRequired, id, variant, data_shape, data_type, isOutputMatrix, callback = () => {} }: MatrixInputTypes) => {

    const [row, setRow] = React.useState(3);
    const [column, setColumn] = React.useState(3);
    const [matrixElements, setMatrixElements] = React.useState("");

    const handleChangeRow = (event) => {
        setRow(event.target.value);
    };

    const handleChangeColumn = (event) => {
        setColumn(event.target.value);
    };

    React.useEffect(() => {
        let matrixElementLocal = [];
        for (let i = 0; i < row; i++) {
            let rows = [];
            for (let j = 0; j < column; j++) {
                rows.push(
                    <div style={{width: "65px", marginRight: "4px"}} key={`${id}-${i}-${j}-field`}>
                        <TextField variant="outlined" size="small" id={`${id}-${i}-${j}-field`} name={data_type + `|` + data_shape} inputProps={{min: 0, style: { textAlign: 'center' }}} />
                    </div>
                );
            }
            matrixElementLocal.push(rows);
        }
        let rowCount = 0;
        setMatrixElements(matrixElementLocal.map((x) => {
            rowCount++;
            return (
                <div style={{display: "-webkit-box", marginTop: "4px"}} key={`${id}-${rowCount}-matrix-row`}>
                    {x}
                </div>
            );
        }));
    }, [row, column]);

    return (
        <>
            {!isOutputMatrix && (
                <>
                    <div style={{fontWeight: "700", marginTop: "5px"}}>Размер матрицы</div>
                    <Box sx={{ border: 1, borderRadius: 5, padding: "5px", display: "inline-block" }}>
                        <div style={{display: "flex"}}>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id={`${id}-select-row-label`}>Строки</InputLabel>
                                <Select
                                labelId="select-row-label"
                                id={`${id}-select-row`}
                                value={row}
                                onChange={handleChangeRow}
                                name={`${id}-matrix`}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                </Select>
                            </FormControl>
                            <div style={{fontWeight: "700", fontSize: "20px", marginTop: "20px"}}>X</div>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id={`${id}-select-column-label`}>Столбцы</InputLabel>
                                <Select
                                labelId="select-column-label"
                                id={`${id}-select-column`}
                                value={column}
                                onChange={handleChangeColumn}
                                name={`${id}-matrix`}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </Box>
                    <div style={{marginTop: "10px"}}>
                        {matrixElements}
                    </div>
                </>
            )}
            {isOutputMatrix && (
                <>
                    <div style={{fontWeight: "700"}}>{description}</div>
                    <div id={`${id}-matrix`} />
                </>
            )}
        </>
    )
};

// Exports
export default MatrixInput;
