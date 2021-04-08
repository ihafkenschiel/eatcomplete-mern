/**
 *
 * EditFood
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';

const EditFood = props => {
  const {
    food,
    foodChange,
    formErrors,
    updateFood,
    deleteFood,
    activateFood
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateFood();
  };

  return (
    <div className='edit-food'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Food Name'}
              value={food.name}
              onInputChange={(name, value) => {
                foodChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Description'}
              name={'description'}
              placeholder={'Food Description'}
              value={food.description}
              onInputChange={(name, value) => {
                foodChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Switch
              id={`enable-food-${food._id}`}
              name={'isActive'}
              label={'Active?'}
              checked={food?.isActive}
              toggleCheckboxChange={value => {
                foodChange('isActive', value);
                activateFood(food._id, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='d-flex flex-column flex-md-row'>
          <Button
            type='submit'
            text='Save'
            className='mb-3 mb-md-0 mr-0 mr-md-3'
          />
          <Button
            variant='danger'
            text='Delete'
            onClick={() => deleteFood(food._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditFood;
