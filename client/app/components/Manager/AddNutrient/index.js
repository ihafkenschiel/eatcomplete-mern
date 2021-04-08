/**
 *
 * AddNutrient
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';

const AddNutrient = props => {
  const {
    nutrientFormData,
    formErrors,
    nutrientChange,
    addNutrient,
    foods,
    selectedFoods,
    handleFoodselect
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addNutrient();
  };

  return (
    <div className='add-nutrient'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Nutrient Name'}
              value={nutrientFormData.name}
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
              value={nutrientFormData.description}
              onInputChange={(name, value) => {
                nutrientChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['foods']}
              label={'Select Foods'}
              multi={true}
              options={foods}
              value={selectedFoods}
              handleSelectChange={value => {
                handleFoodselect(value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'active-nutrient'}
              name={'isActive'}
              label={'Active?'}
              checked={nutrientFormData.isActive}
              toggleCheckboxChange={value => nutrientChange('isActive', value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-nutrient-actions'>
          <Button type='submit' text='Add Nutrient' />
        </div>
      </form>
    </div>
  );
};

export default AddNutrient;
