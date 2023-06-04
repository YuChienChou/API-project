import { csrfFetch } from "./csrf";

//type string
export const LOAD_REVIEWS = "review/LOAD_REVIEWS";
export const RECEIVE_REVIEW = "review/RECEIVE_REVIEW";
export const REMOVE_REVIEW = "review/REMOVE_REVIEW";



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

export const actionRemoveReview = (reviewId) => {
    return {
        type: REMOVE_REVIEW,
        reviewId
    }
}

//thunk action creator

export const loadReviewsThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
   
    if(res.ok) {
        const reviews = await res.json(); 
        // console.log("revies in thunk: ", res);
        dispatch(loadReviewsAction(reviews));
        return reviews;
    } else {
        const errors = await res.json();
        return errors;
    };
};

export const createReviewThunk = (spotId, review) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST", 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });

    if(res.ok) {
        const newReview = await res.json();
        dispatch(receiveReviewAction(newReview));
        return newReview;
    } else {
        const errors = await res.json();
        console.log("errors in review reducer: ", errors);
        return errors;
    };
};

export const thunkRemoveReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    });

    if(res.ok) {
        dispatch(actionRemoveReview(reviewId));
        return;
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
        };
        case REMOVE_REVIEW: {
            const reviewsState = {...state};
            delete reviewsState[action.reviewId];
            return reviewsState;
        }
        default: {
            return state;
        }
    }
}

export default reviewReducer;