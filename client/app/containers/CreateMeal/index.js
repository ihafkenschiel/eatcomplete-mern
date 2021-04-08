/*
 *
 * CreateMeal
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';


class CreateMeal extends React.PureComponent {
  render() {
    const { user } = this.props;

    return (
      <h1>Step 2 - Create Your Meal!</h1>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(CreateMeal);
