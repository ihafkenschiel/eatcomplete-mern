/**
 *
 * NavigationMenu
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';

import actions from '../../actions';

import Button from '../../components/Common/Button';
import { CloseIcon } from '../../components/Common/Icon';

class NavigationMenu extends React.PureComponent {
  render() {
    const { isMenuOpen, categories, toggleMenu } = this.props;

    const handleNutrientClick = () => {
      this.props.toggleMenu();
    };

    return (
      <div className='navigation-menu'>
        <div className='menu-header'>
          {isMenuOpen && (
            <Button
              ariaLabel='close the menu'
              icon={<CloseIcon />}
              onClick={toggleMenu}
            />
          )}
        </div>
        <div className='menu-body'>
          <Container>
            {/* <h3 className='menu-title'>Shop By Nutrient</h3> */}
            <nav role='navigation'>
              <ul className='menu-list'>
                {/* {categories.map((link, index) => ( */}
                  <li className='menu-item'>
                    <NavLink
                      // onClick={handleNutrientClick}
                      to='/enterFoods'
                      activeClassName='active-link'
                      exact
                    >
                      1. Find Missing Nutrients
                    </NavLink>
                  </li>
                  <li className='menu-item'>
                    <NavLink
                      // onClick={handleNutrientClick}
                      to='/enterFoods'
                      activeClassName='active-link'
                      exact
                    >
                      2. Create Your Next Meal
                    </NavLink>
                  </li>
                {/* ))} */}
              </ul>
            </nav>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isMenuOpen: state.navigation.isMenuOpen,
    categories: state.nutrient.storeCategories
  };
};

export default connect(mapStateToProps, actions)(NavigationMenu);
