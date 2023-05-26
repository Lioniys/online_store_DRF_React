import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";


const TypeBar = observer(() => {
    const {shop} = useContext(Context)

    return (
        <ListGroup className="">
            {shop.category.map(category =>
                <ListGroup.Item
                    onClick={() => shop.setSelectedCategory(category)}
                    action variant="light" key={category.id}>{category.name}</ListGroup.Item>)}
        </ListGroup>
    );
});

export default TypeBar;