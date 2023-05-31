import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, Image} from "react-bootstrap";
import {SHOP_ROUTE} from "../consts";
import {observer} from "mobx-react-lite";
import BasketModal from "./BasketModal";
import AuthModal from "./AuthModal";
import cart from "../assets/cart.svg"


const NavBar = observer(() => {
    const {user} = useContext(Context);
    const [showBasket, setShowBasket] = useState(false);

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href={SHOP_ROUTE}>Online Store</Navbar.Brand>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <Button onClick={() => setShowBasket(true)}>
                            <Image height={30} width={30} src={cart} className="mx-2"/>
                        </Button>
                        <Button className="ms-4" onClick={() => user.logOut()}>Вихід</Button>
                    </Nav>
                :
                    <Nav className="ml-auto">
                        <Button onClick={() => user.setShowAuth(true)}>Авторизація</Button>
                    </Nav>
                }
            </Container>
            <BasketModal setShowBasket={setShowBasket} showBasket={showBasket}/>
            <AuthModal/>
        </Navbar>
    );
});

export default NavBar;