/*
 *
 * Food reducer
 *
 */

import {
  FETCH_FOODS,
  FETCH_STORE_FOODS,
  FETCH_FOOD,
  FETCH_STORE_FOOD,
  FOOD_CHANGE,
  FOOD_EDIT_CHANGE,
  FOOD_SHOP_CHANGE,
  SET_FOOD_FORM_ERRORS,
  SET_FOOD_FORM_EDIT_ERRORS,
  SET_FOOD_SHOP_FORM_ERRORS,
  RESET_FOOD,
  RESET_FOOD_SHOP,
  ADD_FOOD,
  REMOVE_FOOD,
  FOOD_SELECT,
  FETCH_FOODS_SELECT,
  SET_FOODS_LOADING
} from './constants';

const initialState = {
  foods: [],
  storeFoods: [],
  food: {
    _id: ''
  },
  storeFood: {},
  foodsSelect: [],
  selectedFoods: [],
  isFoodAddOpen: false,
  foodFormData: {
    sku: '',
    name: '',
    description: '',
    quantity: 1,
    price: 1,
    taxable: 0,
    image: {},
    isActive: true
  },
  isLoading: false,
  foodshopData: {
    quantity: 1
  },
  taxableSelect: [
    { value: 1, label: 'Yes' },
    { value: 0, label: 'No' }
  ],
  formErrors: {},
  editFormErrors: {},
  shopFormErrors: {}
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FOODS:
      return {
        ...state,
        foods: action.payload
      };
    case FETCH_STORE_FOODS:
      return {
        ...state,
        storeFoods: action.payload
      };
    case FETCH_FOOD:
      return {
        ...state,
        food: action.payload,
        editFormErrors: {}
      };
    case FETCH_STORE_FOOD:
      return {
        ...state,
        storeFood: action.payload,
        foodshopData: {
          quantity: 1
        },
        shopFormErrors: {}
      };
    case SET_FOODS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case FETCH_FOODS_SELECT:
      return { ...state, foodsSelect: action.payload };
    case ADD_FOOD:
      return {
        ...state,
        foods: [...state.foods, action.payload]
      };
    case REMOVE_FOOD:
      const index = state.foods.findIndex(b => b._id === action.payload);
      return {
        ...state,
        foods: [
          ...state.foods.slice(0, index),
          ...state.foods.slice(index + 1)
        ]
      };
    case FOOD_CHANGE:
      return {
        ...state,
        foodFormData: {
          ...state.foodFormData,
          ...action.payload
        }
      };
    case FOOD_EDIT_CHANGE:
      return {
        ...state,
        food: {
          ...state.food,
          ...action.payload
        }
      };
    case FOOD_SHOP_CHANGE:
      return {
        ...state,
        foodshopData: {
          ...state.foodshopData,
          ...action.payload
        }
      };
    case FOOD_SELECT:
      return {
        ...state,
        selectedFoods: action.payload
      };
    case SET_FOOD_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_FOOD_FORM_EDIT_ERRORS:
      return {
        ...state,
        editFormErrors: action.payload
      };
    case SET_FOOD_SHOP_FORM_ERRORS:
      return {
        ...state,
        shopFormErrors: action.payload
      };
    case RESET_FOOD:
      return {
        ...state,
        foodFormData: {
          sku: '',
          name: '',
          description: '',
          quantity: 1,
          price: 0,
          image: {},
          isActive: true
        },
        formErrors: {},
        selectedFoods: []
      };
    case RESET_FOOD_SHOP:
      return {
        ...state,
        foodshopData: {
          quantity: 1
        },
        shopFormErrors: {}
      };
    default:
      return state;
  }
};

export default foodReducer;
