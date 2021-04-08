/*
 *
 * Add
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddNutrient from '../../components/Manager/AddNutrient';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  componentDidMount() {
    this.props.fetchFoodsSelect();
  }

  render() {
    const {
      history,
      foods,
      nutrientFormData,
      formErrors,
      selectedFoods,
      handleFoodselect,
      nutrientChange,
      addNutrient
    } = this.props;

    return (
      <SubPage
        title='Add Nutrient'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        <AddNutrient
          foods={foods}
          nutrientFormData={nutrientFormData}
          formErrors={formErrors}
          selectedFoods={selectedFoods}
          handleFoodselect={handleFoodselect}
          nutrientChange={nutrientChange}
          addNutrient={addNutrient}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    foods: state.food.foodsSelect,
    nutrientFormData: state.nutrient.nutrientFormData,
    formErrors: state.nutrient.formErrors,
    selectedFoods: state.food.selectedFoods
  };
};

export default connect(mapStateToProps, actions)(Add);
