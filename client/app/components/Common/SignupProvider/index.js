/**
 *
 * SignupProvider
 *
 */

import React from 'react';

import { GoogleIcon } from '../Icon';
import { BASE_API_URL } from '../../../constants';

const SignupProvider = props => {
  return (
    <div className='signup-provider'>
      <a href={`${BASE_API_URL}/auth/google`} className='google-btn'>
        <GoogleIcon />
        <span className='btn-text'>Login with Google</span>
      </a>
    </div>
  );
};

export default SignupProvider;
