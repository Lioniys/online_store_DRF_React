import React, {useContext} from 'react';
import {Button, Dropdown, Form, Row, Stack} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const ToolBar = observer((
    {search, setSearch, dropdownName, setDropdownName, setOrdering}) => {
    const {shop} = useContext(Context);

    return (
        <Row>
            <Stack direction="horizontal" gap={2} className="mb-3 w-75">
                <Form.Control
                    className="me-auto"
                    placeholder="Я шукаю..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <Button variant="secondary">Пошук</Button>
            </Stack>
            <Stack direction="horizontal" gap={2} className="mb-3 w-25">
                <Dropdown>
                    <Dropdown.Toggle variant="secondary">{dropdownName}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                            setOrdering('price')
                            setDropdownName('Від дешевих до дорогих')
                            shop.setPage(1)
                        }}>Від дешевих до дорогих</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setOrdering('-price')
                            setDropdownName('Від дорогих до дешевих')
                            shop.setPage(1)
                        }}>Від дорогих до дешевих</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Stack>
        </Row>
    );
});

export default ToolBar;