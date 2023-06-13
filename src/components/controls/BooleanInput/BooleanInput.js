
// Libraries
import * as React from 'react';

// Components
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';

// Types
type BooleanInputTypes = {
    description?: string;
    title?: string;
    callback?: () => void;
    isDisabeld?: boolean;
    isDefaultChecked?: boolean;
    isChecked?: boolean;
    size?: string;
    id?: string;
    data_shape?: string;
    data_type?: string;
};

const BooleanInput = ({ description, title, isDisabeld, isChecked, isDefaultChecked, size, id, data_shape, data_type, callback = () => {} }: BooleanInputTypes) => {

    return (
        <>
            <Tooltip title={description} arrow placement="left">
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={isChecked}
                        defaultChecked={isDefaultChecked}
                        disabled={isDisabeld}
                        size={size}
                        id={id}
                    />
                }
                    label={title}
                />
            </Tooltip>
        </>
    )
};

// Exports
export default BooleanInput;
