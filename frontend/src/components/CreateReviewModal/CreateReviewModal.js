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
    const [disabled, setDisabled] = useState(true);

    // const user = useSelector(state => state.session.user); 
    // console.log("user in createReviewModel: ", user);
    // console.log("stars in createReviewModal: ", stars);

    useEffect(() => {
        const errors = {};
        if(review.length < 10) errors.review  = 'Review needs a minimum of 10 characters';
        if(stars < 1) errors.stars = 'Stars range from 1 to 5';

        setErrors(errors);

        if(Object.values(errors).length < 1) setDisabled(false);
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
        // console.log("newReview in create review Modal: ", newReview);
        if(newReview.errors) {
            setErrors(newReview.errors)
        } else { 
            dispatch(loadReviewsThunk(spot.id));
            dispatch(fetchDetailedSpotThunk(spot.id));
        }

        closeModal();
        
    };

    // console.log("errors in create review modal: ", errors.errors);

    const onChange = (stars) => {
        setStars(stars);
    };
    
    if(!user) return <></>;


    return (
        <>
        <div id='create-review-modal'>
            
            <h3>How was your stay?</h3>
            {hasSubmitted && <p>{errors.review}</p>}
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
            id={disabled ? 'create-review-button-disabled' : "create-review-button-active"}
            > 
                Submit Your Review
            </button>
        </div>
        </>
    )

}

export default CreateReviewModal;