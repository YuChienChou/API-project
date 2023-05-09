import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadReviewsThunk } from "../../store/reviews";


const SpotReviews = () => {
    const reviewsStore = useSelector((state) => state.reviews);
    console.log("reviewsStore in spotreviews: ", reviewsStore);
    const reviews = Object.values(reviewsStore);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadReviewsThunk());
    }, [dispatch]);

    if(reviews.length < 1) return null;

    return (
        <>
        <div>
            <ul>
               {reviews.map((review) => (
                // <h4>{review.user.firstName}</h4>
                <p>{review.review}</p>
               ))}
            </ul>
        </div>
        </>
    )
};

export default SpotReviews;


