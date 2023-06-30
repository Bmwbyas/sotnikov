import * as React from 'react';
import {FC, ReactNode} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MyIconButton from "../myIconButton";
import MyButton from "../myButton";

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type MyModalType = {
    children?: ReactNode
    icon: ReactNode
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const MyModal: FC<MyModalType> = ({children, icon, onClick}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true)

    const handleClose = () => setOpen(false);

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleClose()
        if (onClick) {
            onClick(e);
        }
    }

    return (
        <>
            <MyIconButton onClick={handleOpen}>
                {icon}
            </MyIconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box component="div" sx={style}>
                    {children}
                    <MyButton name={'confirm'} onClick={onClickHandler}/>
                    <MyButton name={'cancel'} onClick={handleClose}/>
                </Box>
            </Modal>
        </>
    );
}
export default MyModal