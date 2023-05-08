import { csrfFetch } from "./csrf";

//redux
//type string
const LOAD_SPOTS = "spots/LOAD_SPOTS";


//action creator
export const loadSpotsAction = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

//thunk action creator

export const loadSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');
    
    if(res.ok) {
        const spots = await res.json();
        // console.log("spots in thunk: ", spots);
        dispatch(loadSpotsAction(spots));
        return spots;
    };
};

//reducer: case in the reducer for all user reviews
//normalize review data

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch(action.type) {

        case LOAD_SPOTS: {
            const spotsState = {};
            action.spots.Spots.forEach((spot) => {
                // console.log("spot in for each loop: ", spot);
                spotsState[spot.id] = spot;
            });
            // console.log('spotsState in reducer: ', spotsState);
            return spotsState;
        };

        default: {
            return state;
        };
    }
};

export default spotsReducer;

