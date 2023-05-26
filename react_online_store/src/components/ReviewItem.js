import React from 'react';
import {Button, Card} from "react-bootstrap";


const ReviewItem = ({reviews, productId}) => {
    return (
        <div>
            {reviews ? reviews.map(review =>
                <Card key={review.id} className="shadow h-100 mt-3">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        {review.user} - {review.time_create}
                        <Button variant={"outline-primary"}>Коментувати</Button>
                    </Card.Header>
                    <Card.Body>{review.text}
                        <ReviewItem reviews={review.children}/>
                    </Card.Body>
                </Card>
            ) : ''}
        </div>
    );
};

export default ReviewItem;