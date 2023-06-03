import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import CreateReview from "../Reviews/CreateReview";
import { createReviewThunk } from '../../store/reviews';
import { loadReviewsThunk } from '../../store/reviews';
import StarRating from './Stars';
import './CreateReview.css';



const CreateReviewModal = ({ spot, user }) => {
    console.log("spot in creatReview: ", spot);

    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState();
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const history = useHistory();

    // const user = useSelector(state => state.session.user); 
    console.log("user in createReviewModel: ", user);

    useEffect(() => {
        const errors = {};
        if(review.length < 10) errors.review  = 'Review needs a minimum of 10 characters';
        if(stars < 1) errors.review = 'Stars range from 1 to 5';

        setErrors(errors);
    }, [review, stars]);

    const onSubmit = async (e) => {

        e.preventDefault();

        const payload = {
            userId: user.id,
            review,
            stars,
        }

        const newReview = await dispatch(createReviewThunk(spot.id, payload));

        if(!newReview) {
            setErrors(newReview.errors)
        } else { 
            dispatch(loadReviewsThunk(spot.id));
            history.push(`/spots/${spot.id}`);
        }

        closeModal();
        
    };

    const onChange = (stars) => {
        setStars(stars);
    };
    
    if(!user) return <></>;


    return (
        <>
        <h3>How was your stay?</h3>
        <input 
            type='text'
            placeholder="Leave your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
        />
        <span>
            <StarRating 
            stars={stars}
            disabled={false}
            onChange={onChange}
            />
        </span>
        <button
        onClick={onSubmit} 
        > 
            Submit Your Review
        </button>

        <p></p>

        </>
    )

}

export default CreateReviewModal;