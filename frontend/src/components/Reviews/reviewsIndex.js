import { useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { loadReviewsThunk } from "../../store/reviews";


const SpotReviews = () => {
    const { spotId } = useParams();
    const reviewsStore = useSelector((state) => state.reviews);
    console.log("reviewsStore in spotreviews: ", reviewsStore);
    const review = Object.values(reviewsStore);
    console.log("reviews in reviewindex: ", review)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadReviewsThunk(spotId));
    }, [dispatch]);

    if(!review) return null;

    return (
        <>
        <div>
            <ul>
               {review.map((review) => (
                <li key={review.id}>
                    <h4>{review.User.firstName}</h4>
                    <p>{review.review}</p>
                </li>
               ))}
            </ul>
        </div>
        </>
    )
};

export default SpotReviews;


