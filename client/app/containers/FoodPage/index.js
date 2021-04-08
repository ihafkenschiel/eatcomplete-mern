/**
 *
 * FoodPage
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import { BagIcon } from '../../components/Common/Icon';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class FoodPage extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchStoreFood(slug);
    document.body.classList.add('food-page');
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.fetchStoreFood(slug);
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('food-page');
  }

  render() {
    const {
      isLoading,
      food,
      foodshopData,
      shopFormErrors,
      itemsInCart,
      foodshopChange,
      handleAddToCart,
      handleRemoveFromCart
    } = this.props;

    return (
      <div className='food-shop'>
        {isLoading ? (
          <LoadingIndicator />
        ) : Object.keys(food).length > 0 ? (
          <Row className='flex-row'>
            <Col xs='12' md='5' lg='5' className='mb-3 px-3 px-md-2'>
              <div className='position-relative'>
                <img
                  className='item-image'
                  src={`${
                    food.imageUrl
                      ? food.imageUrl
                      : '/images/placeholder-image.png'
                  }`}
                />
                {food.inventory <= 0 && !shopFormErrors['quantity'] ? (
                  <p className='stock out-of-stock'>Out of stock</p>
                ) : (
                  <p className='stock in-stock'>In stock</p>
                )}
              </div>
            </Col>
            <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
              <div className='food-container'>
                <div className='item-box'>
                  <div className='item-details'>
                    <h1 className='item-name one-line-ellipsis'>
                      {food.name}
                    </h1>
                    <p className='sku'>{food.sku}</p>
                    <hr />
                    {food.brand && (
                      <p className='by'>
                        see more from{' '}
                        <Link
                          to={`/shop/brand/${food.brand.slug}`}
                          className='default-link'
                        >
                          {food.brand.name}
                        </Link>
                      </p>
                    )}
                    <p className='item-desc'>{food.description}</p>
                    <p className='price'>${food.price}</p>
                  </div>
                  <div className='item-customize'>
                    <Input
                      type={'number'}
                      error={shopFormErrors['quantity']}
                      label={'Quantity'}
                      name={'quantity'}
                      decimals={false}
                      min={1}
                      max={food.inventory}
                      placeholder={'Food Quantity'}
                      disabled={
                        food.inventory <= 0 && !shopFormErrors['quantity']
                      }
                      value={foodshopData.quantity}
                      onInputChange={(name, value) => {
                        foodshopChange(name, value);
                      }}
                    />
                  </div>
                  <div className='item-actions'>
                    {itemsInCart.includes(food._id) ? (
                      <Button
                        variant='primary'
                        disabled={
                          food.inventory <= 0 && !shopFormErrors['quantity']
                        }
                        text='Remove From Bag'
                        className='bag-btn'
                        icon={<BagIcon />}
                        onClick={() => handleRemoveFromCart(food)}
                      />
                    ) : (
                      <Button
                        variant='primary'
                        disabled={
                          food.quantity <= 0 && !shopFormErrors['quantity']
                        }
                        text='Add To Bag'
                        className='bag-btn'
                        icon={<BagIcon />}
                        onClick={() => handleAddToCart(food)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <NotFound message='no food found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    food: state.food.storeFood,
    foodshopData: state.food.foodshopData,
    shopFormErrors: state.food.shopFormErrors,
    itemsInCart: state.cart.itemsInCart,
    isLoading: state.food.isLoading
  };
};

export default connect(mapStateToProps, actions)(FoodPage);
