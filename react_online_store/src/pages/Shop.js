import React, {useContext, useEffect, useState} from 'react';
import {Alert, Col, Container, Row} from "react-bootstrap";
import CategoryBar from "../components/CategoryBar";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getBrands, getCategory, getProducts} from "../http/shopAPI";
import Pages from "../components/Pages";
import DeviceItem from "../components/DeviceItem";
import BrandBar from "../components/BrandBar";
import ToolBar from "../components/ToolBar";


const Shop = observer(() => {
    const [showAlert, setShowAlert] = useState(false);
    const [dataAlert, setDataAlert] = useState('Додано в кошик');
    const [typeAlert, setTypeAlert] = useState('success');
    const [search, setSearch] = useState('');
    const [ordering, setOrdering] = useState('');
    const [dropdownName, setDropdownName] = useState('Сортувати');
    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedBrand, setSelectedBrand] = useState({});
    const {shop} = useContext(Context);

    useEffect(() => {
        getCategory().then(data => shop.setCategory(data));
        getBrands().then(data => shop.setBrands(data));
        getProducts(null, null, shop.page).then(data => {
            shop.setProducts(data.results);
            shop.setTotalCount(data.count);
        });
    }, [shop]);

    useEffect(() => {
        getProducts(selectedCategory.id, selectedBrand.id, shop.page, search, ordering).then(data => {
            shop.setProducts(data.results);
            shop.setTotalCount(data.count);
        });
    },[shop, shop.page, selectedCategory.id, selectedBrand.id, search, ordering]);

    return (
        <Container>
            <Row className="mt-3">
                <Alert
                    style={{width:500}}
                    className="text-center position-absolute top-20 start-50 translate-middle"
                    show={showAlert}
                    variant={typeAlert}
                >{dataAlert}</Alert>
                <Col  sm={4} md={3} lg={2}>
                    <CategoryBar setSelectedCategory={setSelectedCategory}/>
                </Col>
                <Col  sm={8} md={9} lg={10}>
                    <ToolBar
                        search={search}
                        setSearch={setSearch}
                        dropdownName={dropdownName}
                        setDropdownName={setDropdownName}
                        setOrdering={setOrdering}
                    />
                    <BrandBar
                        setSelectedBrand={setSelectedBrand}
                        selectedBrand={selectedBrand}
                    />
                    <Row>
                        {shop.products?.map(product =>
                            <DeviceItem
                                key={product.id}
                                product={product}
                                setShowAlert={setShowAlert}
                                setDataAlert={setDataAlert}
                                setTypeAlert={setTypeAlert}
                            />
                        )}
                    </Row>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;