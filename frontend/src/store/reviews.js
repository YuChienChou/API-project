import { csrfFetch } from "./csrf";

//type string
export const LOAD_REVIEWS = "review/LOAD_REVIEWS";


//action creater
export const loadReviewsAction = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

//thunk action creator

export const loadReviewsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/:spotId/reviews');
   

    if(res.ok) {
        const reviews = await res.json(); 
        console.log("revies in thunk: ", res);
        dispatch(loadReviewsAction(reviews));
        return reviews;
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
        default: {
            return state;
        }
    }
}

export default reviewReducer;