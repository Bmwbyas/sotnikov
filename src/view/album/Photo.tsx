import React, {FC} from 'react';
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {IPhoto} from "../../store/slice/photosSlice/types.ts";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
type PhotoType = {
    p: IPhoto
}
const stylePhoto = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
}
const Photo: FC<PhotoType> = ({p}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);

    const bigPhoto = {
        backgroundImage: 'url(' + p.url + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }

    return (
        <Card sx={{ width: 200}}>
            <CardActionArea>
                <CardMedia

                    component="img"
                    height="150"
                    image={p.thumbnailUrl}
                    alt={p.title}
                    onClick={handleOpen}
                />
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box component="div" style={bigPhoto} sx={stylePhoto}>
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                position: 'absolute' as const,
                                right:0,
                                top:0
                            }}
                        >
                            <ClearIcon />
                        </IconButton>
                        <img src={p.url} alt={p.title} height={'100%'}/>
                    </Box>
                </Modal>
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="body2" component="div">
                    {p.title}
                </Typography>

            </CardContent>

        </Card>
    );
};

export default Photo;