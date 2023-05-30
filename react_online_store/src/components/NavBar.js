import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {SHOP_ROUTE} from "../consts";
import {observer} from "mobx-react-lite";
import BasketModal from "./BasketModal";
import AuthModal from "./AuthModal";


const NavBar = observer(() => {
    const {user} = useContext(Context);
    const [showAuth, setShowAuth] = useState(false);
    const [showBasket, setShowBasket] = useState(false);

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href={SHOP_ROUTE}>Online Store</Navbar.Brand>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <Button onClick={() => setShowBasket(true)}>Кошик</Button>
                        <Button className="ms-4" onClick={() => user.logOut()}>Вихід</Button>
                    </Nav>
                :
                    <Nav className="ml-auto">
                        <Button onClick={() => setShowAuth(true)}>Авторизація</Button>
                    </Nav>
                }
            </Container>
            <BasketModal setShowBasket={setShowBasket} showBasket={showBasket}/>
            <AuthModal onHide={() => setShowAuth(false)} show={showAuth}/>
        </Navbar>
    );
});

export default NavBar;