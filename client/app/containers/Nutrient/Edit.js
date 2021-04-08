/*
 *
 * Edit
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import EditNutrient from '../../components/Manager/EditNutrient';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';

class Edit extends React.PureComponent {
  componentDidMount() {
    const nutrientId = this.props.match.params.id;
    this.props.fetchNutrient(nutrientId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const nutrientId = this.props.match.params.id;
      this.props.fetchNutrient(nutrientId);
    }
  }

  render() {
    const {
      history,
      nutrient,
      formErrors,
      nutrientEditChange,
      updateNutrient,
      deleteNutrient
    } = this.props;

    return (
      <SubPage
        title='Edit Nutrient'
        actionTitle='Cancel'
        handleAction={() => history.goBack()}
      >
        {nutrient?._id ? (
          <EditNutrient
            nutrient={nutrient}
            formErrors={formErrors}
            nutrientChange={nutrientEditChange}
            updateNutrient={updateNutrient}
            deleteNutrient={deleteNutrient}
          />
        ) : (
          <NotFound message='no nutrient found.' />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    nutrient: state.nutrient.nutrient,
    formErrors: state.nutrient.editFormErrors
  };
};

export default connect(mapStateToProps, actions)(Edit);
