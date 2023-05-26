import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Carousel, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {getProduct} from "../http/shopAPI";
import ReviewItem from "../components/ReviewItem";
import {observer} from "mobx-react-lite";
import ReviewModal from "../components/ReviewModal";


const ProductPage = observer(() => {
    const [product, setProduct] = useState({})
    const [showAlert, setShowAlert] = useState(false);
    const [showReview, setShowReview] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        getProduct(id).then(data => setProduct(data))
    }, [id])

    return (
        <Container className="mt-3">
            <Alert
                style={{width:500}}
                className="text-center position-absolute top-1 start-50 translate-middle"
                show={showAlert} variant="success"
            >Відгук Додано</Alert>
            <Tabs defaultActiveKey="home" className="mb-3">
                <Tab eventKey="home" title="Home">
                    <Row>
                        <Col md={6}>
                            <Carousel style={{height: 500}}>


                                <Carousel.Item>
                                    <img height={500} className="d-block w-100"
                                         src="https://content.rozetka.com.ua/goods/images/big/18307112.jpg"
                                         alt="Second slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img height={500} className="d-block w-100"
                                         src="https://content2.rozetka.com.ua/goods/images/big/18307351.jpg"
                                         alt="Third slide"
                                    />
                                </Carousel.Item>


                            </Carousel>
                        </Col>
                        <Col md={6}>
                            <Card className="shadow h-100">
                                <Card.Header>{product.name}</Card.Header>
                                <Card.Body>
                                    <Card.Title>Цена  {product.price + '₴'}</Card.Title>
                                    <Card.Text>{product.title}</Card.Text>
                                    <Card.Text>{product.description}</Card.Text>
                                </Card.Body>
                                <Button variant="outline-primary" className="mx-3">Додати в кошик</Button>
                                <Button variant="outline-dark" className="m-3"
                                    onClick={() => setShowReview(true)}>Додати Відгук</Button>
                            </Card>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="profile" title="Відгуки">
                    <ReviewItem reviews={product.review} productId={product.id}/>
                </Tab>
            </Tabs>
            <ReviewModal
                setShowReview={setShowReview}
                setShowAlert={setShowAlert}
                show={showReview}
                productId={product.id}
            />
        </Container>
    );
});

export default ProductPage;