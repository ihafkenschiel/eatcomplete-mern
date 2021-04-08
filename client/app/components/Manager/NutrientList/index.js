/**
 *
 * NutrientList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

import Switch from '../../Common/Switch';

const NutrientList = props => {
  const { categories, activateNutrient } = props;

  return (
    <div className='c-list'>
      {categories.map((nutrient, index) => (
        <div key={index} className='mb-3 p-4 nutrient-box'>
          <div className='d-flex align-items-center justify-content-between mb-2'>
            <h4 className='mb-0'>{nutrient.name}</h4>
            <Switch
              tooltip={nutrient.isActive}
              tooltipContent={`Disabling ${nutrient.name} will also disable all ${nutrient.name} foods.`}
              id={`enable-nutrient-${nutrient._id}`}
              name={'isActive'}
              checked={nutrient.isActive}
              toggleCheckboxChange={value =>
                activateNutrient(nutrient._id, value)
              }
            />
          </div>
          <Link
            to={`/dashboard/nutrient/edit/${nutrient._id}`}
            className='d-block'
          >
            <p className='nutrient-desc mb-2'>{nutrient.description}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NutrientList;
