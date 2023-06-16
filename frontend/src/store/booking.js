import { csrfFetch } from "./csrf";

//type string
export const LOAD_BOOKINGS = "booking/LOAD_BOOKINGS"
export const CREATE_BOOKING = "booking/CREATE_BOOKING";
export const EDIT_BOOKING = 'booking/EDIT_BOOKING';
export const DELETE_BOOKING = 'booking/DELETE_BOOKING';
export const GET_CURRENT_USER_BOOKINGS = 'booking/GET_CURRENT_USER_BOOKINGS';


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

export const editBookingAction = (editedBooking) => {
    return {
        type: EDIT_BOOKING,
        editedBooking
    }

};

export const deleteBookingAction = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        bookingId
    }
}
   

export const getCurrentUserBookingsAction = (userBookings) => {
    return {
        type: GET_CURRENT_USER_BOOKINGS,
        userBookings
    };
}; 


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

        console.log("response from createBookingThunk: ", res);
        if(res.ok) {
            const newBooking = await res.json();
            console.log("newBooking in createBookingThunk: ", newBooking);
            dispatch(createBookingAction(newBooking));
            return newBooking;
        }
    } catch(err) {
        const errors = err.json();
        return errors;
    };
};

export const editBookingThunk = (bookingId, payload) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/bookings/${bookingId}`, {
            method: "PUT",
            headings: {"Content-Type":"application/json"},
            body: JSON.stringify(payload)
        });

        if(res.ok) {
            const editedBooking = await res.json();
            dispatch(editBookingAction(editedBooking));
            return editedBooking;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
};

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/bookings/${bookingId}`, {
            method: "DELETE"
        });

        if(res.ok) {
            console.log("res in deleteBookingThunk: ", res)
            dispatch(deleteBookingAction(bookingId));
            return;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
}


export const getCurrentUserBookingsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch('/api/bookings/current');

        if(res.ok) {
            const userBookings = await res.json();
            console.log("userBookings in the thunk: ", userBookings);
            dispatch(getCurrentUserBookingsAction(userBookings));
            return userBookings;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    };
};


//reducer function

const initialState = {allBookings: {}, singleBooking: {}, userBookings: {}};

const bookingReducer = (state = initialState, action) => {
    switch(action.type) {

        case LOAD_BOOKINGS: {
            const newState = {...state, allBookings: {}, singleBooking: {}, userBookings: {}};
            action.bookings.Bookings.forEach((booking) => {
                newState.allBookings[booking.id] = booking;
            })

            console.log("newState in booking reducer: ", newState);
            return newState;
        }
        case CREATE_BOOKING: {
            // const newState = {...state, allBookings: {...state.allBookings}, singleBooking : {[action.booking.id] : action.booking}}
            const newState = {...state, allBookings: {...state.allBookings, [action.booking.id] : action.booking}, singleBooking: {}, userBookings : {}};

            return newState;
        }
        case EDIT_BOOKING: {
            const newState = {...state, allBookings: {...state.allBookings}, singleBooking: {[action.editedBooking.id] : action.editedBooking}, userBookings : {...state.userBookings}};
            return newState;
        }
        case DELETE_BOOKING: {
            const newState = {...state, allBookings: {...state.allBookings}, singleBooking : {}, userBookings : {}};
            delete newState.allBookings[action.bookingId];
            return newState;
        }
        case GET_CURRENT_USER_BOOKINGS: {
            console.log("userBookings in the reducer function: ", action.bookings);
            const newState = {...state, allBookings: {...state.allBookings}, singleBooking : {}, userBookings : {}};
            action.userBookings.Bookings.forEach((booking) => {
                newState.userBookings[booking.id] = booking;
            });
            return newState;
        }
        default:
            return state;
    };
};


export default bookingReducer;
