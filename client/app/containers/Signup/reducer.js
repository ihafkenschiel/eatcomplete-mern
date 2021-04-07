/*
 *
 * Signup reducer
 *
 */

import {
  SIGNUP_CHANGE,
  SIGNUP_RESET,
  SET_SIGNUP_LOADING,
  SET_SIGNUP_SUBMITTING,
  SET_SIGNUP_FORM_ERRORS
} from './constants';

const initialState = {
  signupFormData: {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  },
  formErrors: {},
  isSubmitting: false,
  isLoading: false
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_CHANGE:
      return {
        ...state,
        signupFormData: { ...state.signupFormData, ...action.payload }
      };
    case SET_SIGNUP_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_SIGNUP_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_SIGNUP_SUBMITTING:
      return {
        ...state,
        isSubmitting: action.payload
      };
    case SIGNUP_RESET:
      return {
        ...state,
        signupFormData: {
          email: '',
          firstName: '',
          lastName: '',
          password: ''
        },
        formErrors: {},
        isLoading: false
      };
    default:
      return state;
  }
};

export default signupReducer;
