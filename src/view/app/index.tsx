import {Route, Routes} from "react-router-dom";
import Header from "../header";
import Albums from "../albums";
import Todos from "../todos";
import {router} from "../../configs/routerConfig.ts";
import {useAppDispatch} from "../../store/hook.ts";
import {useEffect} from "react";
import {initializeApp} from "../../store/slice/appSlice";
import {Container} from "@mui/material";
import Posts from "../posts";
import Album from "../album";
import {ErrorSnackbar} from "../errorSnackbar";

function App() {
    const dispatch=useAppDispatch()
    useEffect(()=>{
        console.log('app')
        dispatch(initializeApp())
    },[dispatch])
    return (

        <Container maxWidth={'lg'}>
            <Header/>
            <ErrorSnackbar/>
            <Routes>
                <Route path={'/'} element={<Posts/>}/>
                <Route path={router.posts} element={<Posts/>}/>
                <Route path={router.photos} element={<Albums/>}/>
                <Route path={router.todos} element={<Todos/>}/>
                <Route path={router.album} element={<Album/>}/>
            </Routes>

        </Container>
    )
}

export default App
