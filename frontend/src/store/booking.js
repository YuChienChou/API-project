import { csrfFetch } from "./csrf";

//type string
export const LOAD_BOOKINGS = "booking/LOAD_BOOKINGS"
export const CREATE_BOOKING = "booking/CREATE_BOOKING";


//action creator
export const loadBookingAction = (bookings) => {
    return {
        type: LOAD_BOOKINGS,
        bookings
    }
}

export const createBookingAction = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}


//thunk action creator

export const loadBookingThunk = (spotId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/bookings`);

        if(res.ok) {
            const bookings = await res.json();
            console.log("Bookings in booking reducer: ", bookings);
            dispatch(loadBookingAction(bookings));
            return bookings;
        }
    } catch(err) {
        const errors = err.json();
        return errors;
    };
};

export const createBookingThunk = (spotId, booking) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(booking)
        });

        if(res.ok) {
            const newBooking = await res.json();
            dispatch(createBookingAction(newBooking));
            return newBooking;
        }
    } catch(err) {
        const errors = err.json();
        return errors;
    };
};


//reducer function

const initialState = {allBookings: {}, userBookings: {}};

const bookingReducer = (state = initialState, action) => {
    switch(action.type) {

        case LOAD_BOOKINGS: {
            const newState = {...state, allBookings: {}, userBookings: {}};
            action.bookings.Bookings.forEach((booking) => {
                newState.allBookings[booking.id] = booking;
            })

            console.log("newState in booking reducer: ", newState);
            return newState;
        }
        case CREATE_BOOKING: {
            const newState = {...state, allBookings: {...state.allBookings, [action.booking.id] : action.booking}}
            return newState;
        }
        default:
            return state;
    };
};


export default bookingReducer;
