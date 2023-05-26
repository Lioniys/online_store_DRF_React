import React from 'react';
import {Routes, Route} from 'react-router-dom'
import {publicRouters} from "../routers";


const AppRouter = () => {

    return (
        <Routes>
            {publicRouters.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>)}
        </Routes>
    );
};

export default AppRouter;