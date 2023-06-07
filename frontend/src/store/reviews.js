import { csrfFetch } from "./csrf";

//type string
export const LOAD_REVIEWS = "review/LOAD_REVIEWS";
export const RECEIVE_REVIEW = "review/RECEIVE_REVIEW";
export const REMOVE_REVIEW = "review/REMOVE_REVIEW";
export const EDIT_REVIEW = 'reviwe/EDIT_REVIEW';
export const CLEAR_REVIEW = 'review/CLEAN_REVIEW';



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

export const actionEditReview = (editedReview) => {
    return {
        type: EDIT_REVIEW,
        editedReview
    }
}

export const actionClearReview = () => {
    return {
        type: CLEAR_REVIEW,
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

    try {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
                method: "POST", 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(review)
            });
        
            // console.log("newReview res in createReviewThunk: ", res);
        
        
            if(res.ok) {
                const newReview = await res.json();
                // console.log("newReview res in createReviewThunk: ", res);
                dispatch(receiveReviewAction(newReview));
                return newReview;
    }} catch (err) {
        const errors = await err.json();
            // console.log("errors in review reducer: ", errors);
            return errors;
    }
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

export const thunkGetCurrentUserReview = () => async (dispatch) => {
    try {
        const res = await csrfFetch('/api/reviews/current');
        
        if(res.ok) {
            const currentUserReviews = await res.json();
            // console.log("currentUserReviews in Thunk: ", currentUserReviews);
            dispatch(loadReviewsAction(currentUserReviews));
            return currentUserReviews;
        }
    } catch (err) {
        const errors = await err.json();
        return errors;
    }
};

export const thunkEditReview = (reviewId, payload) => async (dispatch) => {

    try {
        const res = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(payload)
        });

        // console.log("editReview in thunk: ", res);

        if(res.ok) {
            const editedReview = await res.json();
            dispatch(actionEditReview(editedReview));
            return editedReview;
        } 
    } catch (err) {
        const errors = await err.json();
        return errors;
    }
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
        }
        case RECEIVE_REVIEW: {
            const reviewsState = {...state, [action.review.id]: action.review};
            return reviewsState;
        }
        case REMOVE_REVIEW: {
            const reviewsState = {...state};
            delete reviewsState[action.reviewId];
            return reviewsState;
        }

        case EDIT_REVIEW: {
            // console.log("old state in review reducer: ", state);
            // console.log("action.editedReview.id in review reducer: ", action.editedReview.id);
            // console.log("edited review in review reducer: ", action.editedReview);
            const reviewsState = {...state, [action.editedReview.id]: {...state[action.editedReview.id], ...action.editedReview}};
            //in the new state, first, copy the old state by spread operator, find the key I want to edit, then assign it a new value. 
            //However, I don't want to replace the every key in the state because I only want to update the key/vaule pairs in my edited review. 
            //for doing that, I need to copy the original value from my old state for the specific key, 
            
            // console.log("reviewsState in review reducer: ", reviewsState);
            return reviewsState;
        }

        case CLEAR_REVIEW: {
            // return { ...state, currentUserReviews: {}}
            return {}
        }
            

        default: 
            return state;
        
    }
}

export default reviewReducer;