/**
 *
 * EditNutrient
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';

const EditNutrient = props => {
  const {
    nutrient,
    nutrientChange,
    formErrors,
    updateNutrient,
    deleteNutrient
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateNutrient();
  };

  return (
    <div className='edit-nutrient'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Nutrient Name'}
              value={nutrient.name}
              onInputChange={(name, value) => {
                nutrientChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Description'}
              name={'description'}
              placeholder={'Nutrient Description'}
              value={nutrient.description}
              onInputChange={(name, value) => {
                nutrientChange(name, value);
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
            onClick={() => deleteNutrient(nutrient._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditNutrient;
