import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import App from "./view/app";
import {Provider} from "react-redux";
import {store} from "./store";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
)
