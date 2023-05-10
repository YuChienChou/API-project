import { csrfFetch } from "./csrf";

//redux
//type string
const LOAD_SPOTS = "spots/LOAD_SPOTS";
const RECEIVE_SPOT = "spots/RECEIVE_SPOT";
const UPDATE_SPOT = 'spots/UPDATE_SPOT';


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

    if(res.ok) {
        const spotDetails =await res.json();
        // console.log("spotDetails in thunk: ", spotDetails);
        dispatch(receiveSpotAction(spotDetails));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const createSpotThunk = (spot, imagesArray, owner) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    });

    if(res.ok) {
        const newSpot = await res.json();

        const finalImageArray = [];

        for (let image of imagesArray) {
            image.spotId = newSpot.id;
            const imageRes = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(image)
            });

            if(imageRes.ok) {
                const newImage = await imageRes.json();
                finalImageArray.push(newImage);
            } else {
                const errors = await imageRes.json();
                return errors;
            };
            
        }
        newSpot.SpotImages = finalImageArray;
        newSpot.owner = owner;

        dispatch(receiveSpotAction(newSpot));
        return newSpot;
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const updateSpotThunk = (spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    });

    if(res.ok) {
        const updatedSpot = await res.json();
        dispatch(editSpotAction(updatedSpot));
        return updatedSpot;
    } else {
        const errors = await res.json();
        return errors;
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
        case RECEIVE_SPOT: {
            const spotState = {...state, [action.spot.id]: action.spot}
            return spotState; 
        };
        case UPDATE_SPOT: {
            const spotState = {...state, [action.spot.id]: action.spot}
            return spotState;
        };
        default:
            return state;
        
    }
};

export default spotsReducer;

