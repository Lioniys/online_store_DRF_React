import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getBrand, getCategory, getProducts} from "../http/shopAPI";
import Pages from "../components/Pages";
import DeviceItem from "../components/DeviceItem";


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
        <Container>
            <Row className="mt-3">
                <Col  sm={4} md={3} lg={2}>
                    <TypeBar/>
                </Col>
                <Col  sm={8} md={9} lg={10}>
                    <Row>
                        {shop.products.map(product => <DeviceItem key={product.id} product={product}/>)}
                    </Row>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;