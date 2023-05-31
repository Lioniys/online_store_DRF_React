import React, {useEffect, useState} from 'react';
import {Button, Image, ListGroup, Modal} from "react-bootstrap";
import {delBasket, getBasket, putBasket} from "../http/shopAPI";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import trash from "../assets/trash-alt.svg";


const BasketModal = ({setShowBasket, showBasket}) => {
    const [basket, setBasket] = useState({});
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        if (showBasket) {
            getBasket().then(data => {
                setBasket(data);
                console.log(data)
            })
        }
    }, [showBasket, trigger]);
    
    const increment = (id, product, count) => {
        putBasket(id, product, count + 1).then(() => {
            setTrigger(!trigger);
            setTimeout(() => {
                setTrigger(!trigger);
            }, 100);
        })
    }
    
    const decrement = (id, product, count) => {
        if (count > 1) {
            putBasket(id, product, count - 1).then(() => {
                setTrigger(!trigger);
                setTimeout(() => {
                    setTrigger(!trigger);
                }, 100);
            });
        }
    }
    
    const del = (id) => {
        delBasket(id).then(() => {
            setTrigger(!trigger);
            setTimeout(() => {
                setTrigger(!trigger);
            }, 100);
        });
    }

    return (
        <Modal
            onHide={() => setShowBasket(false)}
            show={showBasket} size="xl"
            centered animation={true}
            aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header>
                <Modal.Title className="text-center w-100">Кошик</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {basket.list_product?.map(i =>
                        <ListGroup.Item key={i.id} className="d-flex flex-row">
                            <div className="d-flex me-3">
                                <img src={i.product.img} alt={i.id} height={110} width={120}/>
                            </div>
                            <div className="d-flex w-100 me-3">
                                <div className="d-flex flex-column w-100">
                                    <h4>{i.product.name}</h4>
                                    <div className="d-flex justify-content-between">
                                        <div className="fs-5">цена</div>
                                        <div className="fs-5">{Number(i.product.price)}</div>
                                    </div>
                                    <hr className="d-flex" />
                                    {Number(i.product.price) !== i.product.discount_price ?
                                        <div className="d-flex justify-content-between">
                                            <div className="fs-5">цена со скидкой</div>
                                            <div className="fs-5">{i.product.discount_price}</div>
                                        </div>
                                    : ''}
                                </div>
                            </div>
                            <div className="d-flex  w-100">
                                <div className="d-flex align-items-center w-100">
                                    <div className="d-flex w-50"></div>
                                    <div className="d-flex ">
                                        <Image height={30} width={30} src={minus} style={{cursor: "pointer"}}
                                        onClick={() => decrement(i.id, i.product.id, i.count)}/>
                                    </div>
                                    <h1 className="d-flex w-50 justify-content-center">{i.count}</h1>
                                    <div className="d-flex">
                                        <Image height={30} width={30} src={plus} style={{cursor: "pointer"}}
                                        onClick={() => increment(i.id, i.product.id, i.count)}/>
                                    </div>
                                    <div className="d-flex w-100 justify-content-center">
                                        <Button variant="danger" onClick={() => del(i.id)}>
                                            <Image height={30} width={30} src={trash}/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex w-100 flex-row">
                    <div className="d-flex w-25"></div>
                    <div className="d-flex w-100">
                        <div className="d-flex fs-4">Сумарно</div>
                        <div className="d-flex w-25"></div>
                        <div className="d-flex fs-3">{basket.total_sum}</div>
                    </div>
                    <div className="d-flex w-100">
                        <div className="d-flex fs-4">Кількість всього</div>
                        <div className="d-flex w-25"></div>
                        <div className="d-flex fs-3">{basket.count_all}</div>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default BasketModal;