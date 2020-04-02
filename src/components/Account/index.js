import React from 'react';

import { AuthUserContext, withAuthorization } from "../Session";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";


const AccountPage = (props) => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm /> 
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => authUser != null;


export default withAuthorization(authCondition)(AccountPage)
