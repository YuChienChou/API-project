import { csrfFetch } from "./csrf";

//type string
export const ADD_IMAGES = 'image/ADD_IMAGES';

//action creator 

export const createSpotImagesAction = (image) => {
    return {
        type: ADD_IMAGES,
        image
    };
};

//thunk action creator 

export const createSpotImagesThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            url: "",
            preview: true
        })
    });

    if(res.ok) {
        const newImage = await res.json();
        dispatch(createSpotImagesAction(newImage));
        return newImage;
    } else {
        const errors = await res.json();
        return errors;
    }
};


//reducer 

const initialState = {};

const spotImageReducer = (state =initialState, action) => {
    switch(action.type) {
        case ADD_IMAGES: {
            const spotImagesState = {...state, [action.type.id]: action.image};
            return spotImagesState
        };

        default: 
            return state;
    };
};

export default spotImageReducer;
