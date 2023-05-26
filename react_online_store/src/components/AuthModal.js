import React, {useContext, useState} from 'react';
import {Button, Form, Modal, Row} from "react-bootstrap";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const AuthModal = observer(({onHide, show}) => {
    const {user} = useContext(Context)
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const singIn = async () => {
        try {
            if (isLogin) {
                if(username && password) {
                    const userId = await login(username, password)
                    user.setUser({id: userId})
                    user.setIsAuth(true)
                    onHide()
                }
            } else {
                if(username && password && email) {
                    const userId = await registration(username, password, email)
                    console.log(userId)
                }
            }
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Modal onHide={onHide}
               show={show}
               centered animation={true}
               aria-labelledby="contained-modal-title-vcenter">
            <Modal.Body>
                <h2 className="m-auto text-center">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="flex-column d-flex"  validated={true} >
                    {isLogin ? '' :
                        <Form.Control
                            required
                            className="mt-3"
                            placeholder="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />}
                    <Form.Control
                        required
                        className="mt-3"
                        placeholder="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Form.Control
                        required
                        className="mt-3"
                        placeholder="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        className="mt-3"
                        variant={"outline-primary"}
                        onClick={singIn}
                    >
                        {isLogin ? 'Войти' : 'Зарегестрироваться'}
                    </Button>
                    <Row className="mt-3 pl-3 pr-3 d-flex justify-content-center text-center">
                        <div className="d-flex justify-content-center">
                            <div className="mt-2">{isLogin ? 'Нет аккаунта? ' : 'Есть аккаунт? '}</div>
                            <Button onClick={() => setIsLogin(!isLogin)} variant={"link"}>
                                {isLogin ? 'Регистрация' : 'Авторизация'}
                            </Button>
                        </div>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
});

export default AuthModal;