/**
 *
 * FoodsShop
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import FoodList from '../../components/Store/FoodList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class FoodsShop extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchStoreFoods(slug);
  }

  render() {
    const { foods, isLoading } = this.props;

    return (
      <div className='foods-shop'>
        {isLoading ? (
          <LoadingIndicator />
        ) : foods.length > 0 ? (
          <FoodList foods={foods} />
        ) : (
          <NotFound message='no foods found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    foods: state.food.storeFoods,
    isLoading: state.food.isLoading
  };
};

export default connect(mapStateToProps, actions)(FoodsShop);
