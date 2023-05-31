
// Libraries
import * as React from 'react';

// Components
import TextField from "@mui/material/TextField";

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
};

const MatrixInput = ({ description, title, isDisabeld, value, isFullWidth, isRequired, id, variant, data_shape, data_type, callback = () => {} }: MatrixInputTypes) => {

    return (
        <>
            <div style={{fontWeight: "700", marginTop: "5px"}}>{title}</div>
            <div style={{marginTop: "5px"}}>{description}</div>
        </>
    )
};

// Exports
export default MatrixInput;
