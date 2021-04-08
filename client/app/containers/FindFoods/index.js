/*
 *
 * FindFoods
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';


class FindFoods extends React.PureComponent {
  render() {
    const { user } = this.props;

    return (
        <div>
            <h1>Step 1 - Find Your Nutrients</h1>
            <p>Select the foods you have eaten today to find out which nutrients you still need to consume.</p>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(FindFoods);
