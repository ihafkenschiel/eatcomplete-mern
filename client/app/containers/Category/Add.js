/*
 *
 * Add
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddCategory from '../../components/Manager/AddCategory';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  componentDidMount() {
    this.props.fetchFoodsSelect();
  }

  render() {
    const {
      history,
      foods,
      categoryFormData,
      formErrors,
      selectedFoods,
      handleFoodselect,
      categoryChange,
      addCategory
    } = this.props;

    return (
      <SubPage
        title='Add Category'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        <AddCategory
          foods={foods}
          categoryFormData={categoryFormData}
          formErrors={formErrors}
          selectedFoods={selectedFoods}
          handleFoodselect={handleFoodselect}
          categoryChange={categoryChange}
          addCategory={addCategory}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    foods: state.food.foodsSelect,
    categoryFormData: state.category.categoryFormData,
    formErrors: state.category.formErrors,
    selectedFoods: state.food.selectedFoods
  };
};

export default connect(mapStateToProps, actions)(Add);
