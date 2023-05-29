import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Carousel, Col, Container, Image, Row, Tab, Tabs} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {getProduct} from "../http/shopAPI";
import ReviewItem from "../components/ReviewItem";
import {observer} from "mobx-react-lite";
import ReviewModal from "../components/ReviewModal";
import star from "../assets/star.svg";
import CommentaryModal from "../components/CommentaryModal";


const ProductPage = observer(() => {
    const [product, setProduct] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [dataAlert, setDataAlert] = useState('Відгук Додано');
    const [typeAlert, setTypeAlert] = useState('success');
    const [showReview, setShowReview] = useState(false);
    const [showCommentary, setShowCommentary] = useState(false);
    const [idCommentary, setIdCommentary] = useState(0);
    const [trigger, setTrigger] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        getProduct(id).then(data => {
            setProduct(data);
            setTrigger(false);
        })
    }, [id, trigger]);

    return (
        <Container className="mt-3">
            <Alert
                style={{width:500}}
                className="text-center position-absolute top-1 start-50 translate-middle"
                show={showAlert}
                variant={typeAlert}
            >{dataAlert}</Alert>
            <Tabs defaultActiveKey="home" className="mb-3">
                <Tab eventKey="home" title="Усе про товар">
                    <Row>
                        <Col md={6}>
                            <Carousel style={{height: 500}}>
                                <Carousel.Item>
                                    <img height={500} className=" w-100" src={product.img} alt="Second slide"/>
                                </Carousel.Item>
                                {product.photos ? product.photos.map(img =>
                                    <Carousel.Item key={img.id}>
                                        <img height={500} className="d-block w-100" src={img.img} alt={img.id}/>
                                    </Carousel.Item>) : ''}
                            </Carousel>
                        </Col>
                        <Col md={6}>
                            <Card className="shadow h-100">
                                <Card.Header>{product.name}</Card.Header>
                                <Card.Body>
                                    <Card.Title>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>{Number(product.price) + '₴'}</div>
                                            <div className="d-flex align-items-center">
                                                <div>{product.rating}</div>
                                                <Image width={18} height={18} src={star}/>
                                            </div>
                                        </div>
                                        {product.discount_price !== Number(product.price) ?
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>{product.discount_price + '₴'}</div>
                                                <div className="d-flex align-items-center">
                                                    <div>ціна зі знижкою</div>
                                                </div>
                                            </div>
                                            : ''}
                                    </Card.Title>
                                    <Card.Text>{product.title}</Card.Text>
                                    <Card.Text>{product.description}</Card.Text>
                                </Card.Body>
                                <Button variant="outline-primary" className="mx-3">Додати в кошик</Button>
                                <Button
                                    variant="outline-dark"
                                    className="m-3"
                                    onClick={() => setShowReview(true)}
                                >Написати Відгук</Button>
                            </Card>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="profile" title="Відгуки">
                    <ReviewItem
                        reviews={product.review}
                        setShowCommentary={setShowCommentary}
                        setIdCommentary={setIdCommentary}
                    />
                </Tab>
            </Tabs>
            <ReviewModal
                setShowReview={setShowReview}
                setShowAlert={setShowAlert}
                setDataAlert={setDataAlert}
                setTypeAlert={setTypeAlert}
                show={showReview}
                productId={product.id}
                setTrigger={setTrigger}
            />
            <CommentaryModal
                setShowCommentary={setShowCommentary}
                setShowAlert={setShowAlert}
                showCommentary={showCommentary}
                productId={product.id}
                idCommentary={idCommentary}
                setTrigger={setTrigger}
            />
        </Container>
    );
});

export default ProductPage;