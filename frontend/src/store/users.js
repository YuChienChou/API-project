import { csrfFetch } from "./csrf";


//type stirng
const GET_USER = "users/GET_USER";


//action creator
export const getUserAction = (user) => {
    return {
        type: GET_USER,
        user
    };
};


//thunk action creatro

export const getUserThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`);

    if(res.ok) {
        const user = await res.json();
        dispatch(getUserAction(user));
        return user;
    } else {
        const errors = await res.json();
        return errors;
    };
};


//reducer

const initialState = {};

const UsersReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER: {
            const usersState = {};
            action.users.Users.forEach((user) => {
                usersState[user.id] = user;
            })

            return usersState;
        };
        default: 
            return state;
    };
};

export default UsersReducer;




