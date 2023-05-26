import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Row} from "react-bootstrap";
import {Context} from "../index";
import DeviceItem from "./DeviceItem";


const DeviceList = observer(() => {
    const {shop} = useContext(Context)

    return (
        <Row>
            {shop.products.map(product => <DeviceItem key={product.id} product={product}/>)}
        </Row>
    );
});

export default DeviceList;