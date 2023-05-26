import React from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import star from "../assets/star.svg"
import {useNavigate} from "react-router-dom"
import {DEVISE_ROUTE} from "../consts";

const DeviceItem = ({product}) => {
    const navigate = useNavigate()

    return (
        <Col md={2} className="px-1 pb-1" onClick={() => navigate(DEVISE_ROUTE + '/' + product.id)}>
            <Card style={{cursor: "pointer"}} className="h-100 p-2 text-center shadow" >
                <Card.Img className="rounded" variant="top" src={product.img} />
                <Card.Body className="p-0 mt-2">
                    <Card.Title className="text-center fs-6">{product.name}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>{product.price + '₴'}</div>
                        <div className="d-flex align-items-center">
                            <div>{product.rating}</div>
                            <Image width={18} height={18} src={star}/>
                        </div>
                    </div>
                    <Card.Text className="lh-1 mt-2 text-start">
                        {product.description.slice(0, 100)}
                    </Card.Text>
                    <Button variant={"outline-primary"} className="w-100" >В кошик</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default DeviceItem;