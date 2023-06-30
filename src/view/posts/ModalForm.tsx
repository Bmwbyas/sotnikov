import * as React from 'react';
import {FC} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Grid} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MyButton from "../../components/myButton";
import MyIconButton from "../../components/myIconButton";
import Input from "../../components/input";
import {UpdateAlbumsType} from "../../store/slice/albumSlice/types.ts";
import {UpdatePostType} from "../../store/slice/postSlice/types.ts";

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

type ModalFormType={
    data:any
    updateData:(data:UpdatePostType|UpdateAlbumsType)=>void
}

const ModalForm:FC<ModalFormType>=({data,updateData})=> {
    const [open, setOpen] = React.useState(false);
    const [userName, setUserName] = React.useState(data.userName);
    const [title, setTitle] = React.useState(data.title);
    const [body, setBody] = React.useState(data.body);
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false);
    }
    const onSubmit=()=>{
        updateData({body,title,userName})
        handleClose()
    }
    return (
        <>
            <MyIconButton onClick={handleOpen}>
                <EditIcon/>
            </MyIconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box component="form" sx={style}>
                    <Input
                        fullWidth
                        label="userName"
                        value={userName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setUserName(event.target.value);
                            event.stopPropagation()
                        }}
                    />
                    <Input
                        label="title"
                        value={title}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setTitle(event.target.value);
                            event.stopPropagation()
                        }}
                        fullWidth
                        multiline
                    />
                    {data.body && <Input
                        fullWidth
                        label="body"
                        value={body}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setBody(event.target.value);
                            event.stopPropagation()
                        }}
                        multiline
                    />}
                    <Grid>
                        <MyButton name={'Submit'}  onClick={onSubmit}  />
                        <MyButton name={'Cancel'}  onClick={handleClose}  />
                    </Grid>
                </Box>
            </Modal>
        </>
    );
}
export default ModalForm