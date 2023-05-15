import { useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { loadReviewsThunk } from "../../store/reviews";
import './Reviews.css';


const SpotReviews = () => {
    const { spotId } = useParams();
    const reviewsStore = useSelector((state) => state.reviews);
    // console.log("reviewsStore in spotreviews: ", reviewsStore);
    const reviews = Object.values(reviewsStore);
    const user = useSelector((state) => state.session.user)
    // console.log("reviews in reviewindex: ", reviews);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadReviewsThunk(spotId));
    }, [dispatch, spotId]);

    if(!reviews) return null;

    return (
        <>
        <div>
            
            <ul>
               {reviews.map((review) => (
                <li key={review.id}
                    id='single-spot-review'
                >
                    <h4>{review.User.firstName}</h4>
                    <p>{review.createdAt}</p>
                    <p>{review.review}</p>
                    {(() => {
                        if(review.ownerId === user.id) {
                            return <button>Delete Review</button>
                        }
                    })()}
                </li>
               ))}
            </ul>
        </div>
        </>
    )
};

export default SpotReviews;


