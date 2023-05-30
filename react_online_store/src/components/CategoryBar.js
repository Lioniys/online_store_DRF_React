import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";


const CategoryBar = observer(({setSelectedCategory}) => {
    const {shop} = useContext(Context);

    return (
        <ListGroup className="d-flex flex-column overflow-auto">
            {shop.category.map(category =>
                <ListGroup.Item
                    className="overflow-auto"
                    onClick={() => {
                        setSelectedCategory(category)
                        shop.setPage(1)
                    }}
                    action variant="light" key={category.id}
                >{category.name}</ListGroup.Item>)}
        </ListGroup>
    );
});

export default CategoryBar;