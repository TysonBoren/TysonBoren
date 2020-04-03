import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import "../styles/sign-up.scss"

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignUpPage = () => (
  <div className="sign-up-wrapper">
    <div className="content-wrapper">

      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  make: "",
  model: "",
  year: "",
  mileage: "",
  error: null,
}



class SignUpFormBase extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { username, email, passwordOne, make, model, year, mileage } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne, make, model, year, mileage)
      // this creates users in the firebase internal auth database and in realtime database on signup. 
      .then(authUser => {
       this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            model,
            make,
            year,
            mileage
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME)
          })
          .catch(error => {
            this.setState({ error })
            console.log( error )
          })
      })
      .catch(error => {
        this.setState({ error })
        console.log( error )

      })
    event.preventDefault();
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
      const {
        username,
        email,
        passwordOne,
        passwordTwo,
        make,
        model,
        year,
        mileage,
        error,
      } = this.state;

      const isInvalid = 
        passwordOne !== passwordTwo ||
        passwordOne === "" ||
        email === "" ||
        username === "";

      return (
        <div className="sign-up-wrapper">
         <div className="form-wrapper">
            <form onSubmit={this.onSubmit} className="ugh" >
              <div className="inputs" >
                <input
                  name="username"
                  value={username}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Full Name"
                />
              </div>

              <div className="inputs">
                <input
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  type="email"
                  placeholder="Email Address"
                />
              </div>

              <div>
                <input
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
                />
              </div>  

              <div>
                <input
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>

              <div>
                <input
                  name="make"
                  value={make}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Make of motorcycle"
                />
              </div>

              <div>
                <input
                  name="model"
                  value={model}
                  onChange={this.onChange}
                  type="text"
                  placeholder="model of motorcycle"
                />
              </div>

              <div>
                <input
                  name="year"
                  value={year}
                  onChange={this.onChange}
                  type="number"
                  placeholder="year of motorcycle"
                />
              </div>

              <div>
                <input
                  name="mileage"
                  value={mileage}
                  onChange={this.onChange}
                  type="float"
                  placeholder="Current Mileage"
                />
              </div>
                {/* <input type="submit">SIGN UP!</input> */}
                <div>
                <button className="sign-in-btn" disabled={isInvalid} type="submit">Sign Up</button>
                </div>

              {error && <p>{error.message}</p>}
            </form>
          </div>
        </div>
      )
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase)

export default SignUpPage;

export { SignUpForm, SignUpLink };