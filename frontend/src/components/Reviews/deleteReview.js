import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchDetailedSpotThunk } from '../../store/spots';
import { thunkRemoveReview } from '../../store/reviews';


export default function DeleteReview ({ spot, review }) {

    console.log("review in DeleteReview: ", review)

    const dispatch = useDispatch();
    const history =  useHistory();

    const handleReviewDelete = () => {
        console.log("review id in handReviewDele: ", review.id);
        dispatch(thunkRemoveReview(review.id));
        dispatch(fetchDetailedSpotThunk(spot.id));
        history.push(`/spots/${spot.id}`);
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