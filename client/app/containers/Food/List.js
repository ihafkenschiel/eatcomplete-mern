/*
 *
 * List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import FoodList from '../../components/Manager/FoodList';
import SubPage from '../../components/Manager/SubPage';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchFoods();
  }

  render() {
    const { history, foods } = this.props;

    return (
      <>
        <SubPage
          title='Foods'
          actionTitle='Add'
          handleAction={() => history.push('/dashboard/food/add')}
        >
          <FoodList foods={foods} />
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    foods: state.food.foods,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(List);
