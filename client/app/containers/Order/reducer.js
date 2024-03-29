/*
 *
 * Order reducer
 *
 */

import {
  FETCH_ORDERS,
  FETCH_ORDER,
  UPDATE_ORDER,
  TOGGLE_ADD_ORDER,
  SET_ORDERS_LOADING,
  CLEAR_ORDERS
} from './constants';

const initialState = {
  orders: [],
  order: {
    _id: '',
    cartId: '',
    foods: [],
    totalTax: 0,
    total: 0,
    status: ''
  },
  isLoading: false,
  isOrderAddOpen: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case FETCH_ORDER:
      return {
        ...state,
        order: action.payload
      };
    case UPDATE_ORDER:
      const itemIndex = state.order.foods.findIndex(
        item => item._id === action.payload.itemId
      );

      const newFoods = [...state.order.foods];
      newFoods[itemIndex].status = action.payload.status;

      return {
        ...state,
        order: {
          ...state.order,
          foods: newFoods
        }
      };
    case SET_ORDERS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case TOGGLE_ADD_ORDER:
      return {
        ...state,
        isOrderAddOpen: !state.isOrderAddOpen
      };
    case CLEAR_ORDERS:
      return {
        ...state,
        orders: []
      };

    default:
      return state;
  }
};

export default orderReducer;
