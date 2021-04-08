/*
 *
 * Nutrient actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

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

import { RESET_FOOD } from '../Food/constants';

import handleError from '../../utils/error';
import { unformatSelectOptions } from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';

export const nutrientChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: NUTRIENT_CHANGE,
    payload: formData
  };
};

export const nutrientEditChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: NUTRIENT_EDIT_CHANGE,
    payload: formData
  };
};

export const toggleAddNutrient = () => {
  return {
    type: TOGGLE_ADD_NUTRIENT
  };
};

export const nutrientSelect = value => {
  return {
    type: NUTRIENT_SELECT,
    payload: value
  };
};

// fetch store categories api
export const fetchStoreCategories = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/nutrient/list`);

      dispatch({
        type: FETCH_STORE_CATEGORIES,
        payload: response.data.categories
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch categories api
export const fetchCategories = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/nutrient`);

      dispatch({
        type: FETCH_CATEGORIES,
        payload: response.data.categories
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch nutrient api
export const fetchNutrient = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/nutrient/${id}`);

      dispatch({
        type: FETCH_NUTRIENT,
        payload: response.data.nutrient
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// add nutrient api
export const addNutrient = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required|min:1',
        description: 'required|min:1|max:200',
        foods: 'required'
      };

      const nutrient = getState().nutrient.nutrientFormData;
      const foods = getState().food.selectedFoods;

      let newFoods = unformatSelectOptions(foods);

      let newNutrient = {
        foods: newFoods,
        ...nutrient
      };

      const { isValid, errors } = allFieldsValidation(newNutrient, rules, {
        'required.name': 'Name is required.',
        'min.name': 'Name must be at least 1 character.',
        'required.description': 'Description is required.',
        'min.description': 'Description must be at least 1 character.',
        'max.description':
          'Description may not be greater than 200 characters.',
        'required.foods': 'Foods is required.'
      });

      if (!isValid) {
        return dispatch({ type: SET_NUTRIENT_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post(`/api/nutrient/add`, newNutrient);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_NUTRIENT,
          payload: response.data.nutrient
        });
        dispatch({ type: RESET_NUTRIENT });
        dispatch({ type: RESET_FOOD });
        dispatch(toggleAddNutrient());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// update nutrient api
export const updateNutrient = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: 'required|min:1',
        description: 'required|min:1|max:200'
      };

      const nutrient = getState().nutrient.nutrient;

      const newNutrient = {
        name: nutrient.name,
        description: nutrient.description
      };

      const { isValid, errors } = allFieldsValidation(newNutrient, rules, {
        'required.name': 'Name is required.',
        'min.name': 'Name must be at least 1 character.',
        'required.description': 'Description is required.',
        'min.description': 'Description must be at least 1 character.',
        'max.description': 'Description may not be greater than 200 characters.'
      });

      if (!isValid) {
        return dispatch({
          type: SET_NUTRIENT_FORM_EDIT_ERRORS,
          payload: errors
        });
      }

      const response = await axios.put(`/api/nutrient/${nutrient._id}`, {
        nutrient: newNutrient
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

// activate nutrient api
export const activateNutrient = (id, value) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.put(`/api/nutrient/${id}/active`, {
        nutrient: {
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

// delete nutrient api
export const deleteNutrient = id => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/nutrient/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success == true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_NUTRIENT,
          payload: id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
