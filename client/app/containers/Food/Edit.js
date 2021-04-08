/*
 *
 * Edit
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import EditFood from '../../components/Manager/EditFood';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class Edit extends React.PureComponent {
  componentDidMount() {
    const foodId = this.props.match.params.id;
    this.props.fetchFood(foodId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const foodId = this.props.match.params.id;
      this.props.fetchFood(foodId);
    }
  }

  render() {
    const {
      history,
      food,
      formErrors,
      foodEditChange,
      updateFood,
      deleteFood,
      activateFood
    } = this.props;

    return (
      <SubPage
        title='Edit Food'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        {food?._id ? (
          <EditFood
            food={food}
            formErrors={formErrors}
            foodChange={foodEditChange}
            updateFood={updateFood}
            deleteFood={deleteFood}
            activateFood={activateFood}
          />
        ) : (
          <NotFound message='no food found.' />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    food: state.food.food,
    formErrors: state.food.editFormErrors
  };
};

export default connect(mapStateToProps, actions)(Edit);
