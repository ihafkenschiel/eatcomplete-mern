/*
 *
 * FindFoods
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';


class FindFoods extends React.PureComponent {
  render() {
    const { user } = this.props;

    return (
        <div>
            <h1>Step 1 - Find Your Nutrients</h1>
            <p>Select the foods you have eaten today to find out which nutrients you still need to consume.</p>


            <div class="row">

                <div class="col-md-6">

                    <h2>Foods</h2>
                    <p>Check off the foods you have eaten today.</p>
                    <br />
                    <label>Search Filter: </label>
                    <div class="input-group">
                        <input class="form-control" type="text" size="30" placeholder="Start typing an ingredient..." />
                        <span class="input-group-addon glyphicon glyphicon-remove"></span>
                    </div>
                    <br />
                    <div>
                        <button type="button" class="btn btn-default btn-sm green"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                        Food Name
                    </div>

                    <br />
                    <div class="text-center">
                        Pagination
                    </div>

                    <br /><br />
                </div>

                <div class="col-md-3">
                    <h2>Nutrients</h2>
                    <p>See what nutrients you still need.</p>
                    <br />

                    <div>
                        <h4>Selected Food(s):</h4>
                        <ul>
                            <li>curFood</li>
                        </ul>
                        <hr />
                        <h4>Contains:</h4>
                        <ol class="green">
                            <li>curNute</li>
                        </ol>
                        <hr />
                    </div>

                    <h4>Missing:</h4>
                    <ol class="pink">
                        <li>nutrient.name</li>
                    </ol>
                </div>

                <div class="col-md-3">
                    <h2>Step 2</h2>
                    <p>What to eat next?</p>
                    <br />
                    <a href="/nutrientsToFood" class="btn btn-primary" role="button">Next!</a>
                </div>

            </div>


        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(FindFoods);
