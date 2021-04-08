/*
 *
 * Add
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddFood from '../../components/Manager/AddFood';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  componentDidMount() {
    this.props.fetchBrandsSelect();
  }

  render() {
    const {
      history,
      foodFormData,
      formErrors,
      taxableSelect,
      selectedBrands,
      brands,
      foodChange,
      handleBrandSelect,
      addFood
    } = this.props;

    return (
      <SubPage
        title='Add Food'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        <AddFood
          foodFormData={foodFormData}
          formErrors={formErrors}
          taxableSelect={taxableSelect}
          selectedBrands={selectedBrands}
          brands={brands}
          foodChange={foodChange}
          handleBrandSelect={handleBrandSelect}
          addFood={addFood}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    foodFormData: state.food.foodFormData,
    formErrors: state.food.formErrors,
    taxableSelect: state.food.taxableSelect,
    selectedBrands: state.brand.selectedBrands,
    brands: state.brand.brandsSelect
  };
};

export default connect(mapStateToProps, actions)(Add);
