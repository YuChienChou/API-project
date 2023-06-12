import { useDispatch } from 'react-redux';
import { useState } from 'react'
import { fetchDetailedSpotThunk } from '../../store/spots';
import { thunkRemoveReview } from '../../store/reviews';
import { useModal } from '../../context/Modal'
import './deleteReviewModal.css'


export default function DeleteReviewModal ({ spot, review }) {

    const [errors, setErrors] = useState();
    const [hasSubmit, setHasSubmit] = useState(false);

    // console.log("review in DeleteReview: ", review);

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleReviewDelete = (e) => {
        e.preventDefault();
        setHasSubmit(true);

        // const deletedReview = await dispatch(thunkRemoveReview(review.id));

        // console.log("deletedReview in deleteReviewModal", deletedReview);

        // if(deletedReview.ok) {
            
        //     dispatch(fetchDetailedSpotThunk(spot.id));
        //     closeModal();
        // }

        console.log("review id in handReviewDele: ", review.id);
        return dispatch(thunkRemoveReview(review.id))  
            .then(dispatch(fetchDetailedSpotThunk(spot.id)))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    return (
        <>
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?</p>
        {/* {hasSubmit && <p>{errors.errors}</p>} */}
        <div className='confirm-delete-review-div'>
            <button 
                type='submit'
                onClick={handleReviewDelete}
                id='confirm-delete-review-button'
            >
                Yes (Delete Review)
            </button>
            <button 
                onClick={closeModal}
            >
                No (Keep Review)
            </button>
        </div>
        </>
    )

}