/**
 *
 * CategoryShop
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import FoodList from '../../components/Store/FoodList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class CategoryShop extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchCategoryFoods(slug);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.fetchCategoryFoods(slug);
    }
  }

  render() {
    const { foods, isLoading } = this.props;

    return (
      <div className='category-shop'>
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
    foods: state.food.foods,
    isLoading: state.food.isLoading
  };
};

export default connect(mapStateToProps, actions)(CategoryShop);
