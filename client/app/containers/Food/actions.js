/*
 *
 * Food actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

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
  RESET_FOOD,
  ADD_FOOD,
  REMOVE_FOOD,
  FOOD_SELECT,
  FETCH_FOODS_SELECT,
  SET_FOODS_LOADING
} from './constants';

import { RESET_BRAND } from '../Brand/constants';

import handleError from '../../utils/error';
import { formatSelectOptions } from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';

export const foodChange = (name, value) => {
  let formData = {};
  formData[name] = value;
  return {
    type: FOOD_CHANGE,
    payload: formData
  };
};

export const foodEditChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: FOOD_EDIT_CHANGE,
    payload: formData
  };
};

export const foodshopChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: FOOD_SHOP_CHANGE,
    payload: formData
  };
};

export const handleFoodselect = value => {
  return {
    type: FOOD_SELECT,
    payload: value
  };
};

// fetch foods api
export const fetchFoods = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/food`);

      dispatch({
        type: FETCH_FOODS,
        payload: response.data.foods
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch store foods api
export const fetchStoreFoods = () => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_FOODS_LOADING, payload: true });

    console.log("DEBUG: fetchStoreFoods")

    try {
      const response = await axios.get(`/api/food/list`);

      console.log(response.data);

      dispatch({
        type: FETCH_STORE_FOODS,
        payload: response.data.foods
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_FOODS_LOADING, payload: false });
    }
  };
};

// fetch food api
export const fetchFood = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/food/${id}`);

      const inventory = response.data.food.quantity;
      const food = { ...response.data.food, inventory };

      dispatch({
        type: FETCH_FOOD,
        payload: food
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch store food api
export const fetchStoreFood = slug => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_FOODS_LOADING, payload: true });

    console.log("DEBUG! - fetchStoreFood");

    try {
      const response = await axios.get(`/api/food/item/${slug}`);

      console.log(response.data);

      const food = { ...response.data.food };

      dispatch({
        type: FETCH_STORE_FOOD,
        payload: food
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_FOODS_LOADING, payload: false });
    }
  };
};

export const fetchBrandFoods = slug => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_FOODS_LOADING, payload: true });

    try {
      const response = await axios.get(`/api/food/list/brand/${slug}`);

      dispatch({
        type: FETCH_FOODS,
        payload: response.data.foods
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_FOODS_LOADING, payload: false });
    }
  };
};

export const fetchNutrientFoods = slug => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_FOODS_LOADING, payload: true });

    try {
      const response = await axios.get(`/api/food/list/nutrient/${slug}`);

      dispatch({
        type: FETCH_FOODS,
        payload: response.data.foods
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_FOODS_LOADING, payload: false });
    }
  };
};

export const fetchFoodsSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/food/list/select`);

      let formattedFoods = formatSelectOptions(response.data.foods, true);

      dispatch({
        type: FETCH_FOODS_SELECT,
        payload: formattedFoods
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// add food api
export const addFood = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        sku: 'required|min:6',
        name: 'required|min:1',
        description: 'required|min:1|max:200',
        quantity: 'required|numeric',
        price: 'required|numeric',
        taxable: 'required',
        brand: 'required',
        image: 'required'
      };

      const food = getState().food.foodFormData;
      const brand = getState().brand.selectedBrands.value;

      const newFood = {
        ...food,
        brand: brand
      };

      const { isValid, errors } = allFieldsValidation(newFood, rules, {
        'required.sku': 'Sku is required.',
        'min.sku': 'Sku must be at least 1 character.',
        'required.name': 'Name is required.',
        'min.name': 'Name must be at least 1 characters.',
        'required.description': 'Description is required.',
        'min.description': 'Description must be at least 1 character.',
        'max.description':
          'Description may not be greater than 200 characters.',
        'required.quantity': 'Quantity is required.',
        'required.price': 'Price is required.',
        'required.taxable': 'Taxable is required.',
        'required.brand': 'Brand is required.',
        'required.image': 'Please upload files with jpg, jpeg, png format.'
      });

      if (!isValid) {
        return dispatch({ type: SET_FOOD_FORM_ERRORS, payload: errors });
      }
      const formData = new FormData();
      if (newFood.image) {
        for (var key in newFood) {
          if (newFood.hasOwnProperty(key)) {
            formData.append(key, newFood[key]);
          }
        }
      }
      const response = await axios.post(`/api/food/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_FOOD,
          payload: response.data.food
        });
        dispatch({ type: RESET_FOOD });
        dispatch({ type: RESET_BRAND });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// update Food api
export const updateFood = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required|min:1',
        description: 'required|min:1|max:200'
      };

      const food = getState().food.food;

      const newFood = {
        name: food.name,
        description: food.description
      };

      const { isValid, errors } = allFieldsValidation(newFood, rules, {
        'required.name': 'Name is required.',
        'min.name': 'Name must be at least 1 character.',
        'required.description': 'Description is required.',
        'min.description': 'Description must be at least 1 character.',
        'max.description': 'Description may not be greater than 200 characters.'
      });

      if (!isValid) {
        return dispatch({
          type: SET_FOOD_FORM_EDIT_ERRORS,
          payload: errors
        });
      }

      const response = await axios.put(`/api/food/${food._id}`, {
        food: newFood
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));

        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// activate food api
export const activateFood = (id, value) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(`/api/food/${id}/active`, {
        food: {
          isActive: value
        }
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// delete food api
export const deleteFood = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/food/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_FOOD,
          payload: id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
