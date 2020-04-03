import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes"

const SignInPage = () => (
  <div className='signin-body'>
    
    <div className="signin-wrapper">
      <div className="links-wrapper">

        <h1>SignIn</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
      </div>
    {/* <img src="https://images.unsplash.com/photo-1532334664543-a1ac9d95137d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" /> */}
    </div>         
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props)
  
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error })
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState ({ [event.target.name ]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";
    
    return (

      <div>
      <div>
        {/* <img src="https://images.unsplash.com/photo-1532334664543-a1ac9d95137d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" /> */}
      </div>
      <form onSubmit={this.onSubmit}>

      <div>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
      </div>

      <div>
        <input
          name="password" 
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
      </div>
      <div className="sign-in-btn">
        <button  disabled={isInvalid} type="submit">Sign In</button>
      </div>
        {error && <p>{error.message}</p>}

      </form>
      </div>
    )
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;
export { SignInForm };
