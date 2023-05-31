import React, {useContext} from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import star from "../assets/star.svg";
import {useNavigate} from "react-router-dom";
import {PRODUCT_ROUTE} from "../consts";
import {addBasket} from "../http/shopAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const DeviceItem = observer((
    {product, setShowAlert, setDataAlert, setTypeAlert}) => {
    const navigate = useNavigate();
    const {user} = useContext(Context);

    const click = () => {
        if (user.isAuth) {
            addBasket(product.id).then(() => {
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 1500);
            }).catch(() => {
                setTypeAlert('danger');
                setDataAlert('Не вдалось додати в кошик');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 1500);
                setTimeout(() => {
                    setTypeAlert('success');
                    setDataAlert('Додано в кошик');
                }, 1700);
            });
        } else {
            user.setShowAuth(true);
        }
    }

    return (
        <Col sm={6} md={4} lg={3} className="px-1 pb-1" style={{height:450, width:250}}>
            <Card style={{cursor: "pointer"}} className="h-100 p-2 text-center shadow ">
                <Card.Img className="" height={330} variant="top" src={product.img}
                          onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}/>
                <Card.Body className="p-0 mt-2 d-flex flex-column h-100"
                           onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>
                    <Card.Title className="text-center fs-6">{product.name}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>{Number(product.price) + '₴'}</div>
                        <div className="d-flex align-items-center">
                            <div>{product.rating}</div>
                            <Image width={18} height={18} src={star}/>
                        </div>
                    </div>
                    {product.discount_price !== Number(product.price) ?
                        <div className="d-flex justify-content-between align-items-center">
                            <div>{product.discount_price + '₴'}</div>
                            <div className="d-flex align-items-center">
                                <div>ціна зі знижкою</div>
                            </div>
                        </div>
                        : ''}
                    <Card.Text className="lh-1 mt-2 text-start">
                        {product.description.slice(0, 140)}
                    </Card.Text>
                </Card.Body>
                <Button
                    variant={"outline-primary"}
                    className="w-100 mt-auto"
                    onClick={click}
                >В кошик</Button>
            </Card>
         </Col>
    );
});

export default DeviceItem;