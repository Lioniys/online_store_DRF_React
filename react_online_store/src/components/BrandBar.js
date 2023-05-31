import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";


const BrandBar = observer(({setSelectedBrand, selectedBrand}) => {
    const {shop} = useContext(Context);

    const click = (brand) => {
        if (selectedBrand.id === brand.id) {
            setSelectedBrand({});
            shop.setPage(1);
        } else {
            setSelectedBrand(brand);
            shop.setPage(1);
        }
    }

    return (
        <Row className="d-flex">
            {shop.brands?.map(brand =>
                <Card key={brand.id} style={{cursor: "pointer", width:100}}
                      onClick={() => click(brand)}
                      border={brand.id === selectedBrand.id ? "dark" : "light"}
                      className="p-1 mb-2 mx-1 text-center shadow"
                >{brand.name}</Card>
            )}
        </Row>
    );
});

export default BrandBar;