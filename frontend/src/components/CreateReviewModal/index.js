import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewActions from '../../store/reviews';
import StarRating from './Stars';
import './CreateReview.css';



const CreateReviewModal = () => {
    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
        const errors = {};
        if(review.length < 10) errors.review  = 'Review needs a minimum of 10 characters';
        if(stars < 1) errors.review = 'Stars range from 1 to 5';

        setErrors(errors)
    }, [review, stars]);

    const onSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(reviewActions.receiveReviewThunk({review, stars}))
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) {
                setValidationErrors(data.errors)
            }
        });
    };

    return (
        <>
        <button> 
            Submit Your Review
        </button>

        {/* <p><StarRating /></p> */}

        </>
    )

}

export default CreateReviewModal;