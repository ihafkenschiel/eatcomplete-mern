/*
 *
 * Nutrient reducer
 *
 */

import {
  FETCH_CATEGORIES,
  FETCH_STORE_CATEGORIES,
  FETCH_NUTRIENT,
  NUTRIENT_CHANGE,
  NUTRIENT_EDIT_CHANGE,
  SET_NUTRIENT_FORM_ERRORS,
  SET_NUTRIENT_FORM_EDIT_ERRORS,
  RESET_NUTRIENT,
  TOGGLE_ADD_NUTRIENT,
  ADD_NUTRIENT,
  REMOVE_NUTRIENT
} from './constants';

const initialState = {
  categories: [],
  storeCategories: [],
  nutrient: {
    _id: ''
  },
  isNutrientAddOpen: false,
  nutrientFormData: {
    name: '',
    description: '',
    isActive: true
  },
  formErrors: {},
  editFormErrors: {}
};

const nutrientReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case FETCH_STORE_CATEGORIES:
      return {
        ...state,
        storeCategories: action.payload
      };
    case FETCH_NUTRIENT:
      return {
        ...state,
        nutrient: action.payload
      };
    case ADD_NUTRIENT:
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };
    case REMOVE_NUTRIENT:
      const index = state.categories.findIndex(b => b._id === action.payload);
      return {
        ...state,
        categories: [
          ...state.categories.slice(0, index),
          ...state.categories.slice(index + 1)
        ]
      };
    case NUTRIENT_CHANGE:
      return {
        ...state,
        nutrientFormData: { ...state.nutrientFormData, ...action.payload }
      };
    case NUTRIENT_EDIT_CHANGE:
      return {
        ...state,
        nutrient: {
          ...state.nutrient,
          ...action.payload
        }
      };
    case SET_NUTRIENT_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_NUTRIENT_FORM_EDIT_ERRORS:
      return {
        ...state,
        editFormErrors: action.payload
      };
    case RESET_NUTRIENT:
      return {
        ...state,
        nutrientFormData: {
          name: '',
          description: '',
          isActive: true
        },
        formErrors: {}
      };
    case TOGGLE_ADD_NUTRIENT:
      return { ...state, isNutrientAddOpen: !state.isNutrientAddOpen };
    default:
      return state;
  }
};

export default nutrientReducer;
