import React, {useEffect, useState} from 'react';
import {Button, ListGroup, Modal} from "react-bootstrap";
import {getBasket} from "../http/shopAPI";


const BasketModal = ({setShowBasket, showBasket}) => {
    const [basket, setBasket] = useState({});

    useEffect(() => {
        if (showBasket) {
            getBasket().then(data => {
                setBasket(data);
                console.log(data)
            })
        }
    }, [showBasket]);

    return (
        <Modal
            onHide={() => setShowBasket(false)}
            show={showBasket} size="xl"
            centered animation={true}
            aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header>
                <Modal.Title className="text-center w-100">Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {basket !== {} ? basket.list_product.map(i =>
                        <ListGroup.Item key={i.id} className="d-flex flex-row">
                            <div className="d-flex me-3">
                                <img src={i.product.img} alt={i.id} height={110} width={120}/>
                            </div>
                            <div className="d-flex w-100 me-3">
                                <div className="d-flex flex-column w-100">
                                    <h4>{i.product.name}</h4>
                                    <div className="d-flex justify-content-between">
                                        <h4>цена</h4><h4>{Number(i.product.price)}</h4>
                                    </div>
                                    {Number(i.product.price) !== i.product.discount_price ?
                                        <div className="d-flex justify-content-between">
                                            <h4>цена со скидкой</h4>
                                            <h4>
                                                {Number(i.product.price) !== i.product.discount_price ?
                                                    i.product.discount_price : ''}
                                            </h4>
                                        </div>
                                    : ''}
                                </div>
                            </div>
                            <div className="d-flex  w-100">
                                <div className="d-flex align-items-center">
                                    <h4>
                                        count {i.count}
                                    </h4>
                                </div>
                            </div>
                        </ListGroup.Item>
                    ) : ''}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BasketModal;