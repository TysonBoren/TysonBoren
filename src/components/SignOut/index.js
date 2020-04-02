import React from 'react';
import { withFirebase } from "../Firebase"
import {Link} from "react-router-dom"

const SignOutButton = ({ firebase }) => (
  <div>
    <Link type="button" onClick={firebase.doSignOut}>Sign Out</Link>
  </div>
);

export default withFirebase(SignOutButton);
