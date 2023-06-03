import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import CreateReview from "../Reviews/CreateReview";
import * as reviewActions from '../../store/reviews';
import StarRating from './Stars';
import './CreateReview.css';



const CreateReviewModal = ({ spot, user }) => {
    console.log("spot in creatReview: ", spot);

    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState();
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

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
            review,
            stars,
        }

        setErrors({});
        return await dispatch(reviewActions.receiveReviewThunk(spot.id, user.id, payload))
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) {
                setErrors(data.errors)
            }
        }); 
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