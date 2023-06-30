import {FC, ReactNode,MouseEvent} from "react";
import IconButton from "@mui/material/IconButton";

interface Button {
   onClick:(e:MouseEvent<HTMLButtonElement>)=>void
    children:ReactNode

}
const MyIconButton:FC<Button> = ({onClick,children}) => {


    return (
        <IconButton onClick={onClick}>
            {children}
        </IconButton>
    );
};

export default MyIconButton;