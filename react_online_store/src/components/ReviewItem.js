import React, {useContext} from 'react';
import {Button, Card} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const ReviewItem = observer(({reviews, setShowCommentary, setIdCommentary}) => {
    const {user} = useContext(Context);

    const click = (review) => {
        if (user.isAuth) {
            setShowCommentary(true);
            setIdCommentary(review.id);
        } else {
            user.setShowAuth(true);
        }
    };

    return (
        <div>
            {reviews?.map(review =>
                <Card key={review.id} className="shadow h-100 mt-3">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        {review.user} - {review.time_create}
                        <Button
                            variant={"outline-primary"}
                            onClick={() => click(review)}
                        >Коментувати</Button>
                    </Card.Header>
                    <Card.Body>{review.text}
                        <ReviewItem
                            reviews={review.children}
                            setShowCommentary={setShowCommentary}
                            setIdCommentary={setIdCommentary}
                        />
                    </Card.Body>
                </Card>
            )}
        </div>
    );
});

export default ReviewItem;