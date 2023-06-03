import { csrfFetch } from "./csrf";

//type string
export const LOAD_REVIEWS = "review/LOAD_REVIEWS";
export const RECEIVE_REVIEW = "review/RECEIVE_REVIEW";



//action creater
export const loadReviewsAction = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    };
};

export const receiveReviewAction = (review) => {
    return {
        type: RECEIVE_REVIEW,
        review
    };
};

//thunk action creator

export const loadReviewsThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
   

    if(res.ok) {
        const reviews = await res.json(); 
        // console.log("revies in thunk: ", res);
        dispatch(loadReviewsAction(reviews));
        return reviews;
    };
};

export const receiveReviewThunk = (spotId, userId, review) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST", 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });

    if(res.ok) {
        const newReview = await res.json();
        dispatch(receiveReviewAction(newReview));
        return newReview
    } else {
        const errors = await res.json();
        return errors;
    };
};

//reducer

const initialState = {};

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_REVIEWS: {
            const reviewsState = {};
            action.reviews.Reviews.forEach((review) => {
                reviewsState[review.id] = review
            });
            
            return reviewsState;
        };
        case RECEIVE_REVIEW: {
            const reviewsState = {...state, [action.review.id]: action.review}
            return reviewsState;
        }
        default: {
            return state;
        }
    }
}

export default reviewReducer;