/**
 *
 * FoodList
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const FoodList = props => {
  const { foods } = props;
  return (
    <div className='food-list'>
      <Row className='flex-row'>
        {foods.map((food, index) => (
          <Col
            xs='12'
            md='6'
            lg='4'
            key={index}
            className='mb-3 mb-md-3 px-3 px-md-2'
          >
            <div className='food-container'>
              <div className='item-box'>
                <div className='item-body'>
                  <Link to={`/food/${food.slug}`} className='item-link'>
                    <img
                      src={`${
                        food.imageUrl
                          ? food.imageUrl
                          : '/images/placeholder-image.png'
                      }`}
                    />
                    <div className='item-details p-3'>
                      <h1 className='item-name'>{food.name}</h1>
                      {food.brand && (
                        <p className='by'>
                          By <span>{food.brand.name}</span>
                        </p>
                      )}
                      <p className='item-desc mb-0'>{food.description}</p>
                    </div>
                  </Link>
                </div>
                <div className='item-footer px-3'>
                  <p className='price'>${food.price}</p>
                  {/* {food.quantity > 0 ? (
                      <p className='stock in-stock'>In stock</p>
                    ) : (
                      <p className='stock out-of-stock'>Out of stock</p>
                    )} */}
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FoodList;
