import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createReview} from "../http/shopAPI";


const ReviewModal = ({setShowReview, setShowAlert, show, productId}) => {
    const [radioValue, setRadioValue] = useState('')
    const [text, setText] = useState('')

    const addReview = () => {
        createReview(productId, 'jjj').then(() => {
            setShowReview(false)
            setShowAlert(true)
            setTimeout(() => {setShowAlert(false)
            },600)

        })
    }

    return (
        <Modal onHide={() => setShowReview(false)} show={show} centered animation={true}>
            <h2 className="m-auto text-center mt-3">Залиште Відгук</h2>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-4 text-center" >
                        <div key={`inline-radio`} className="mt-2">
                            {[1, 2, 3, 4, 5].map((i) =>
                                <Form.Check inline key={i} label={i} name="group1" type="radio"
                                            id={`inline-radio-${i}`} value={radioValue}
                                            onChange={e =>
                                                setRadioValue(e.target.value)}
                                />)}
                        </div>
                        <Form.Text className="text-muted">We'll never share your</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control placeholder="Ваш Відгук" as="textarea" rows={3} value={text}
                                      onChange={e => setText(e.target.value)}/>
                        <Form.Text className="text-muted">We'll never share your</Form.Text>
                    </Form.Group>
                    <Button variant="outline-primary" className="w-100" onClick={addReview}>Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ReviewModal;