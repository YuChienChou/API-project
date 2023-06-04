import { useDispatch } from 'react-redux';
import { fetchDetailedSpotThunk } from '../../store/spots';
import { thunkRemoveReview, loadReviewsThunk } from '../../store/reviews';


export default function DeleteReview ({ spot, review }) {

    const dispatch = useDispatch();

    const handleReviewSubmit = () => {
        dispatch(thunkRemoveReview(review.id));
        dispatch(loadReviewsThunk());
        dispatch(fetchDetailedSpotThunk(spot.id));
    };

    return (
        <>
        <button 
        type='submit'
        onClick={handleReviewSubmit}
        >
            Delete Review
        </button>
        </>
    )

}