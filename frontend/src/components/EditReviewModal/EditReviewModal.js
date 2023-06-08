import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditReview, thunkGetCurrentUserReview, loadReviewsThunk, actionClearReview } from "../../store/reviews";
import EditStarRating from './EditStars';
import './EditReviewModal.css'
import { fetchDetailedSpotThunk } from "../../store/spots";

const EditReviewModal = ({ spot, review }) => {
// const EditReviewModal = ({ spot, review }) => {

    console.log("spot in EditReviewModal: ", spot);
    // console.log("review in EditReviewModal: ", review);
    // console.log("spot in EditReviewModal: ", spot);

    const dispatch = useDispatch();
    const [editReview, setEditReview] = useState("");
    const [editStars, setEditStars] = useState(review.stars);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const [hasSubmitted, setHasSebmitted] = useState(false);

    useEffect(() => {
        const errors = {};
        if(editReview.length < 10) errors.editReview  = 'Review needs a minimum of 10 characters';
        if(editStars < 1) errors.editStars = 'Stars range from 1 to 5';

        setErrors(errors);

    }, [editReview, editStars]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSebmitted(true);

        const payload = {
            // spotId: review.Spot.id ? review.Spot.id : spot.id,
            spotId: spot?.id ? spot.id : review.Spot.id,
            // spotId: review.Spot.id,
            userId: review.userId,
            review: editReview,
            stars: editStars,
        }
        // console.log("payload in EditReviewModal onsubmit function: ", payload);

        const editedReview = await dispatch(thunkEditReview(review.id, payload));

        // console.log("editedReview returned from the thunk ", editedReview);
    
        if(editedReview.errors) {
            setErrors(editedReview.errors);
            return
        } else { 
            spot ? dispatch(loadReviewsThunk(spot.id)) : dispatch(thunkGetCurrentUserReview());
            spot ? dispatch(fetchDetailedSpotThunk(spot.id)) : dispatch(fetchDetailedSpotThunk(review.Spot.id))
            closeModal();
        }        
    };

    const onChange = (editStars) => {
        setEditStars(editStars);
    };
    

    return (
        <>
        <div id='update-review-modal'>
            
            <h3>How was your stay at</h3>
            {/* <h3>{review.Spot.name} ?</h3> */}
            {/* <h3>{review.Spot.name ? review.Spot.name : spot.name} ?</h3> */}
            {/* <h3>{spot.name} ?</h3> */}
            <h3>{spot?.name ? spot.name : review.Spot.name} ?</h3>

            {hasSubmitted && errors.review && <p className='update-review-errors'>{errors.review}</p>}
            {hasSubmitted && errors.stars && <p className='update-review-errors'>{errors.stars}</p>}
            <input 
                type='text'
                placeholder={review.review}
                value={editReview}
                onChange={(e) => setEditReview(e.target.value)}
                id='update-review-input'
            />
            <div id='update-star-rating'>
            {hasSubmitted && <p>{errors.editStars}</p>}
                <EditStarRating 
                stars={editStars}
                disabled={false}
                onChange={onChange}
                />
                <p>Stars</p>
            </div>
            <button
            onClick={onSubmit} 
            disabled={Object.values(errors).length > 0}
            id={Object.values(errors).length > 0 ? 'update-review-button-disabled' : "update-review-button-active"}
            > 
                Update Your Review
            </button>
        </div>
        </>
    )

}

export default EditReviewModal;