import TextField, {TextFieldProps} from '@mui/material/TextField';
import {FC} from "react";

type InputProps = {
    sx?: any;
};

 const Input: FC<TextFieldProps & InputProps> =
    (props) => {
        const {sx, ...restProps} = props;

        return (
            <TextField
                sx={{
                    mb:2,
                    ...sx,
                }}
                {...restProps}
            />
        );
    }
export default Input;