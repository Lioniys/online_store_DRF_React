import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getBrand, getCategory, getProducts} from "../http/shopAPI";
import Pages from "../components/Pages";


const Shop = observer(() => {
    const {shop} = useContext(Context);

    useEffect(() => {
        getCategory().then(data => shop.setCategory(data));
        getBrand().then(data => shop.setBrand(data));
        getProducts(null, null, shop.page).then(data => {
            shop.setProducts(data.results);
            shop.setTotalCount(data.count);
        });
    }, [shop]);

    useEffect(() => {
        getProducts(shop.selectedCategory.id, null, shop.page).then(data => {
            shop.setProducts(data.results);
            shop.setTotalCount(data.count);
        });
    },[shop.page, shop.selectedCategory.id, shop]);

    return (
        <Container fluid>
            <Row className="mt-3">
                <Col md={2}>
                    <TypeBar/>
                </Col>
                <Col md={10}>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;