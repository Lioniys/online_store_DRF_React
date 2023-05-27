import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createRating, createReview} from "../http/shopAPI";
import "../styles/star.css";


const ReviewModal = ({setShowReview, setShowAlert, setDataAlert, setTypeAlert, show, productId, setTrigger}) => {
    const [radioValue, setRadioValue] = useState('');
    const [text, setText] = useState('');

    const addReview = () => {
        if (text) {
            createReview(productId, text).then(() => {
                setText('');
                setShowReview(false);
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    setTrigger(true);
                },1000);
            });
        }
        if (radioValue) {
            createRating(productId, radioValue).then(() => {
                setRadioValue('');
                setShowReview(false);
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    setTrigger(true);
                },1000);
            }).catch(e => {
                setTypeAlert('danger');
                setDataAlert(e.response.data[0]);
                setRadioValue('');
                setShowReview(false);
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 1000);
                setTimeout(() => {
                    setTypeAlert('success');
                    setDataAlert('Відгук Додано');
                },1200);
            });
        }
    };

    return (
        <Modal onHide={() => setShowReview(false)} show={show} centered animation={true}>
            <h2 className="m-auto text-center mt-3">Залиште Відгук</h2>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <div>
                            {[1, 2, 3, 4, 5].map((i) =>
                                <div className="rate" key={i}>
                                    <input
                                        type="radio"
                                        id={`star5${i}`}
                                        name="rate"
                                        value={i}
                                        onChange={e => setRadioValue(e.target.value)}
                                    />
                                    <label htmlFor={`star5${i}`} title="star">{i} stars</label>
                                </div>)}
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            placeholder="Ваш Відгук"
                            as="textarea"
                            rows={3} value={text}
                            onChange={e => setText(e.target.value)}
                        />
                        <Form.Text className="text-muted">Це поле не обов'язкове Коментар</Form.Text>
                    </Form.Group>
                    <Button variant="outline-primary" className="w-100" onClick={addReview}>Залишити Відгук</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ReviewModal;