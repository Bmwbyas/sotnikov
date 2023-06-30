import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import MyModal from "../../components/myModal";
import {TypeRow} from "./index.tsx";

interface EnhancedTableToolbarProps {
    selected: number[];
    removeHandler:()=>void
    name:TypeRow
}

export const EnhancedTableToolbar = ({selected,removeHandler,name}: EnhancedTableToolbarProps) => {
    const numSelected=selected.length

    const removeClick=() => {
        removeHandler()
    }
    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h4"
                    id="tableTitle"
                    component="div"
                >
                    {name}
                </Typography>
            )}
            {numSelected > 0 ? (
                    <MyModal icon={<DeleteIcon/>} onClick={removeClick} >
                        <Typography>Вы точно хотите удалить выделенные посты? </Typography>
                    </MyModal>
            ) : (
                <></>
            )}
        </Toolbar>
    );
}