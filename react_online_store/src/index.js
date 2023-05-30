import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserState from "./state/UserState";
import ShopState from "./state/ShopState";


export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{user: new UserState(), shop: new ShopState()}}>
        <App />
    </Context.Provider>
);
