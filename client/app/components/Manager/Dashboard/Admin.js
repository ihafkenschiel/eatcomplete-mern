/*
 *
 * Admin
 *
 */

import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import AccountMenu from '../AccountMenu';
import Page404 from '../../Common/Page404';

import Account from '../../../containers/Account';
import AccountSecurity from '../../../containers/AccountSecurity';
import Order from '../../../containers/Order';
import Users from '../../../containers/Users';
import Nutrient from '../../../containers/Nutrient';
import Food from '../../../containers/Food';
import Brand from '../../../containers/Brand';
import Merchant from '../../../containers/Merchant';

const Admin = props => {
  return (
    <div className='admin'>
      <Row>
        <Col xs='12' md='5' xl='4'>
          <AccountMenu {...props} />
        </Col>
        <Col xs='12' md='7' xl='8'>
          <div className='panel-body'>
            <Switch>
              <Route exact path='/dashboard' component={Account} />
              <Route
                exact
                path='/dashboard/security'
                component={AccountSecurity}
              />
              <Route path='/dashboard/food' component={Food} />
              <Route path='/dashboard/nutrient' component={Nutrient} />
              <Route path='/dashboard/brand' component={Brand} />
              <Route path='/dashboard/users' component={Users} />
              <Route path='/dashboard/merchants' component={Merchant} />
              <Route path='/dashboard/orders' component={Order} />
              <Route path='*' component={Page404} />
            </Switch>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Admin;
