/**
 *
 * FoodList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const FoodList = props => {
  const { foods } = props;

  return (
    <div className='p-list'>
      {foods.map((food, index) => (
        <Link
          to={`/dashboard/food/edit/${food._id}`}
          key={index}
          className='d-block'
        >
          <div className='d-flex flex-column flex-lg-row align-items-lg-center mb-3 food-box'>
            <img
              className='item-image'
              src={`${
                food && food.imageUrl
                  ? food.imageUrl
                  : '/images/placeholder-image.png'
              }`}
            />
            <div className='p-4 p-lg-3'>
              <h4>{food.name}</h4>
              <p className='food-desc mb-2'>{food.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FoodList;
