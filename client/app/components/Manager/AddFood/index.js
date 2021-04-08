/**
 *
 * AddFood
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';

const AddFood = props => {
  const {
    foodFormData,
    formErrors,
    foodChange,
    addFood,
    handleBrandSelect,
    selectedBrands,
    brands,
    taxableSelect,
    image
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addFood();
  };

  return (
    <div className='add-food'>
      <h1 />
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['sku']}
              label={'Sku'}
              name={'sku'}
              placeholder={'Food Sku'}
              value={foodFormData.sku}
              onInputChange={(name, value) => {
                foodChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Food Name'}
              value={foodFormData.name}
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
              value={foodFormData.description}
              onInputChange={(name, value) => {
                foodChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'number'}
              error={formErrors['quantity']}
              label={'Quantity'}
              name={'quantity'}
              decimals={false}
              placeholder={'Food Quantity'}
              value={foodFormData.quantity}
              onInputChange={(name, value) => {
                foodChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'number'}
              error={formErrors['price']}
              label={'Price'}
              name={'price'}
              min={1}
              placeholder={'Food Price'}
              value={foodFormData.price}
              onInputChange={(name, value) => {
                foodChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['taxable']}
              label={'Taxable'}
              multi={false}
              name={'taxable'}
              options={taxableSelect}
              handleSelectChange={value => {
                foodChange('taxable', value.value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['brand']}
              label={'Select Brand'}
              multi={false}
              options={brands}
              value={selectedBrands}
              handleSelectChange={value => {
                handleBrandSelect(value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'file'}
              error={formErrors['file']}
              name={'image'}
              label={'file'}
              placeholder={'Please Upload Image'}
              value={image}
              onInputChange={(name, value) => {
                foodChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'active-food'}
              name={'isActive'}
              label={'Active?'}
              checked={foodFormData.isActive}
              toggleCheckboxChange={value => foodChange('isActive', value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-food-actions'>
          <Button type='submit' text='Add Food' />
        </div>
      </form>
    </div>
  );
};

export default AddFood;
