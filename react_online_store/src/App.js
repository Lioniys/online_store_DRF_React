import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/NavBar"
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import jwtDecode from "jwt-decode";
import {Spinner} from "react-bootstrap";


const App = observer(() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check().then(data => {
            user.setIsAuth(data);
            const userId = jwtDecode(localStorage.getItem('access'))["user_id"];
            user.setUser({id: userId});
        }).finally(() => setLoading(false));
    }, [user]);

    if (loading) {
        return <Spinner className="position-absolute top-50 start-50"/>
    }

  return (
    <BrowserRouter>
        <Navbar/>
        <AppRouter/>
    </BrowserRouter>
  );
});

export default App;
