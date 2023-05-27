import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getBrand, getCategory, getProducts} from "../http/shopAPI";


const Shop = observer(() => {
    const {shop} = useContext(Context)

    useEffect(() => {
        getCategory().then(data => shop.setCategory(data))
        getProducts().then(data => shop.setProducts(data))
        getBrand().then(data => shop.setBrand(data))
    })

    return (
        <Container fluid>
            <Row className="mt-3">
                <Col md={2} className="ps-2">
                    <TypeBar/>
                </Col>
                <Col md={10} className="pe-3">
                    <DeviceList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;