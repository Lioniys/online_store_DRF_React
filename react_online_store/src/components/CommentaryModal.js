import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createReview} from "../http/shopAPI";


const CommentaryModal = ({setShowCommentary, setShowAlert, showCommentary, productId, idCommentary, setTrigger}) => {
    const [text, setText] = useState('');

    const addCommentary = () => {
        if (text) {
            createReview(productId, text, idCommentary).then(() => {
                setText('');
                setShowCommentary(false);
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    setTrigger(true);
                },1000);
            });
        }
    }

    return (
        <Modal onHide={() => setShowCommentary(false)} show={showCommentary} centered animation={true}>
            <h2 className="m-auto text-center mt-3">Залиште Коментар</h2>
            <Modal.Body>
                <Form validated={true}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            required
                            placeholder="Ваш Коментар"
                            as="textarea"
                            rows={3} value={text}
                            onChange={e => setText(e.target.value)}
                        />
                        <Form.Text className="text-muted">Це поле обов'язкове</Form.Text>
                    </Form.Group>
                    <Button variant="outline-primary" className="w-100" onClick={addCommentary}>Залишити Коментар</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CommentaryModal;