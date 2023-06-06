import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReviewThunk } from '../../store/reviews';
import { loadReviewsThunk } from '../../store/reviews';
import { fetchDetailedSpotThunk } from '../../store/spots'
import StarRating from './Stars';
import './CreateReview.css';



const CreateReviewModal = ({ spot, user }) => {
    // console.log("spot in creatReview: ", spot);

    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const [hasSubmitted, setHasSebmitted] = useState(false);

    useEffect(() => {
        const errors = {};
        if(review.length < 10) errors.review  = 'Review needs a minimum of 10 characters';
        if(stars < 1) errors.stars = 'Stars range from 1 to 5';

        setErrors(errors);

    }, [review, stars]);

    const onSubmit = async (e) => {

        e.preventDefault();

        setHasSebmitted(true);

        const payload = {
            userId: user.id,
            review,
            stars,
        }
        // console.log("payload in createReviewModal onsubmit function: ", payload);

        const newReview = await dispatch(createReviewThunk(spot.id, payload));

        // console.log("newReview in CreateReviewModal: ", newReview);
        
        if(newReview.message) {
            // console.log("newReview in create review Modal: ", newReview.message);
            setErrors(newReview);
            return
        } else { 
            // console.log("in the else statement");
            dispatch(loadReviewsThunk(spot.id)); 
            dispatch(fetchDetailedSpotThunk(spot.id));
            closeModal();
        }        
    };

    const onChange = (stars) => {
        setStars(stars);
    };
    
    if(!user) return <></>;

    return (
        <>
        <div id='create-review-modal'>
            
            <h3>How was your stay?</h3>
            {hasSubmitted && errors.review && <p className='create-review-errors'>{errors.review}</p>}
            {hasSubmitted && errors.stars && <p className='create-review-errors'>{errors.stars}</p>}
            {hasSubmitted && errors.message && <p className='create-review-errors'>{errors.message}</p>}
            <input 
                type='text'
                placeholder="Leave your review here..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                id='create-review-input'
            />
            <div id='star-rating'>
            {hasSubmitted && <p>{errors.stars}</p>}
                <StarRating 
                stars={stars}
                disabled={false}
                onChange={onChange}
                />
                <p>Stars</p>
            </div>
            {/* <div>{errors.errors.message}</div> */}
            <button
            onClick={onSubmit} 
            disabled={Object.values(errors).length > 0}
            // id='create-review-button'
            id={Object.values(errors).length > 0 ? 'create-review-button-disabled' : "create-review-button-active"}
            > 
                Submit Your Review
            </button>
        </div>
        </>
    )

}

export default CreateReviewModal;