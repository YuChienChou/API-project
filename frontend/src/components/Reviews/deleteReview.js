import { useDispatch } from 'react-redux';
import { fetchDetailedSpotThunk } from '../../store/spots';
import { thunkRemoveReview, loadReviewsThunk } from '../../store/reviews';


export default function DeleteReview ({ spot, review }) {

    const dispatch = useDispatch();

    const handleReviewDelete = () => {
        console.log("review id in handReviewDele");
        dispatch(thunkRemoveReview(review.id));
        // dispatch(loadReviewsThunk());
        dispatch(fetchDetailedSpotThunk(spot.id));
    };

    return (
        <>
        <button 
        type='submit'
        onClick={handleReviewDelete}
        id='delete-review-button'
        >
            Delete
        </button>
        </>
    )

}