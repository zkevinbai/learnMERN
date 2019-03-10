import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

// Action Types
////////////////////////////////////////////////////////////////////////////////

export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";

// Action Creators
////////////////////////////////////////////////////////////////////////////////

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
}); 

// Thunk Action Creators
////////////////////////////////////////////////////////////////////////////////

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    APIUtil.setAuthToken(false);
    dispatch(logoutUser);
}