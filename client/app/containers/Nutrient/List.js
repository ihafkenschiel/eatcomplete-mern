/*
 *
 * List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import NutrientList from '../../components/Manager/NutrientList';
import SubPage from '../../components/Manager/SubPage';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { history, categories, activateNutrient } = this.props;

    return (
      <>
        <SubPage
          title='Categories'
          actionTitle='Add'
          handleAction={() => history.push('/dashboard/nutrient/add')}
        >
          <NutrientList
            categories={categories}
            activateNutrient={activateNutrient}
          />
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.nutrient.categories,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(List);
