import { csrfFetch } from "./csrf";

//redux
//type string
const LOAD_SPOTS = "spots/LOAD_SPOTS";
const RECEIVE_SPOT = "spots/RECEIVE_SPOT";
const UPDATE_SPOT = 'spots/UPDATE_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const GET_CURRENT_USER_SPOTS = 'spots/GET_CURRENT_USER_SPOTS';
const CLEAR_SPOT = "spots/CLEAR_SPOT";
const SEARCH_SPOTS = "spots/SEARCH_SPOTS";


//action creator
export const loadSpotsAction = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

export const receiveSpotAction = (spot) => ({
    type: RECEIVE_SPOT,
    spot,
});

export const editSpotAction = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot,
    };
};

export const deleteSpotAction = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    };
};

export const getCurrentUserSpotsAction = (spots) => {
    return {
        type: GET_CURRENT_USER_SPOTS,
        spots
    };
};

export const actionClearSpot = () => {
    return {
        type: CLEAR_SPOT,
    }
};

export const loadSearchSpotsAction = (spots) => {
    return {
        type: SEARCH_SPOTS,
        spots
    }
}



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

export const fetchDetailedSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);

    // console.log("!!!!!!!!!!!detailSpot in Thunk~~~~: ");
    if(res.ok) {
        const spotDetails =await res.json();
        // console.log("spotDetails in thunk: ", spotDetails);
        dispatch(receiveSpotAction(spotDetails));
        return spotDetails;
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const createSpotThunk = (spot, imagesArray, owner) => async (dispatch) => {
    try {

    const res = await csrfFetch('/api/spots', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    });

    if(res.ok) {
        const newSpot = await res.json();

        const finalImageArray = [];

        //the imagesArray is passed in from SpotForm
        for (let image of imagesArray) {
            //to assign the spotId to the new image
            image.spotId = newSpot.id;
            const imageRes = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(image)
            });

            if(imageRes.ok) {
                const newImage = await imageRes.json();
                finalImageArray.push(newImage);
            } 
            // else {
            //     const errors = await imageRes.json();
            //     return errors;
            // };
            
        }
        newSpot.SpotImages = finalImageArray;
        newSpot.owner = owner;

        dispatch(receiveSpotAction(newSpot));
        return newSpot;
    } 
    // else {
    //     const errors = await res.json();
    //     return errors;
    // }
    } catch (err) {
            const error = await err.json();
            return error;
        }
};

export const updateSpotThunk = (spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    });

    if(res.ok) {
        const editedSpot = await res.json()

        dispatch(receiveSpotAction(editedSpot));
        return editedSpot;
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const deletSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
    });

    if(res.ok) {
        dispatch(deleteSpotAction(spotId));
        return;
    } else {
        const errors = await res.json();
        return errors;
    };
};

export const getCurrentUserSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/current`);

    if(res.ok) {
        const userSpots = await res.json();
        dispatch(loadSpotsAction(userSpots));
        return userSpots;
    } else {
        const errors = await res.json();
        return errors;
    };

};

export const searchSpotThunk = (query) => async (dispatch) => {

    try {
        const res = await csrfFetch(`/api/spots?${query}`);

        console.log("query in thunk: ", `/api/spots/${query}`)

        if(res.ok) {
            const spots = await res.json();
            console.log("spots in Spot Thunk: ", spots)
            dispatch(loadSearchSpotsAction(spots));
            return spots;
        }
    } catch(err) {
        const errors = await err.json();
        console.log("errors in spot reducer: ", errors)
        return errors;
    }
}

//reducer: case in the reducer for all user reviews
//normalize review data


// const initialState = {};

const initialState = {allState:{}, singleSpot:{}, searchSpot: {}};

const spotsReducer = (state = initialState, action) => {
    switch(action.type) {

        case LOAD_SPOTS: {

            const newState = {...state, allState: {}, singleSpot: {}, searchSpot: {}};
            action.spots.Spots.forEach((spot) => {
                newState.allState[spot.id] = spot;
            });
            
            // console.log("newState in spot reducer: ", newState);
    
            return newState;
            
        };
        case RECEIVE_SPOT: {
            const spotState = {...state, allState: {...state.allState}, singleSpot: {[action.spot.id]: action.spot}, searchSpot: {}}
            // console.log("single spot in Spot reducer: ", spotState.singleSpot);
            return spotState; 
            // return spotState;
        };
        case UPDATE_SPOT: {
            const spotState = {...state, singleSpot: {[action.spot.id]: action.spot}}
            return spotState.singleSpot;
        };
        case DELETE_SPOT: {
            const spotsState = {...state, allState: { ...state.allState}, singleSpot: {}, searchSpot: {}};
            delete spotsState.allState[action.spotId];
            return spotsState;
        };
        case GET_CURRENT_USER_SPOTS: {
            const spotsState = {...state, allState: {}, singleSpot: {}, searchSpot: {}};
            // console.log("spotsState in spot reducer: ", spotsState);
            action.spots.Spots.forEach((spot) => {
                spotsState.allState[spot.id] = spot;
            })
            return spotsState;
        };
        case SEARCH_SPOTS: {
            console.log("Search spots in reducer: ", action.spots);
            const spotState = {...state, allState: {...state.allState}, singleSpot: {...state.singleSpot}, searchSpot: {}};
            // console.log("action.spots in reducer: ", action.spots);
            action.spots.Spots.forEach((spot) => {
                // console.log("spot state in reducer: ", spotState);
                // console.log("spot in reducer: ", spot);
                // console.log("spot.id ", spot.id);
                spotState.searchSpot[spot.id] = spot;
            });
            
            return spotState;

        }
        case CLEAR_SPOT: {
            const emptyState = {...state, allState: {}, singleSpot: {}, searchSpot: {...state.searchSpot}}
            return emptyState;
        }
        default:
            return state;
        
    }
};

export default spotsReducer;

