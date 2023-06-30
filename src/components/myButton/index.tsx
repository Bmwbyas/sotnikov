import {FC, MouseEvent} from "react";
import Button, {ButtonProps} from '@mui/material/Button';

type MyProps={
    name:string
}
const MyButton:FC<ButtonProps&MyProps> =  (props) => {
    const {sx,onClick,name, ...restProps} = props;
    const onClickHandler=(e: MouseEvent<HTMLButtonElement>)=>{
        if (onClick) {
            onClick(e);
        }
    }

    return (
        <Button sx={{ ...sx}}   {...restProps} onClick={onClickHandler}>
            {name}
        </Button>
    );
};

export default MyButton;