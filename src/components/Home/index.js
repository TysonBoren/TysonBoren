import React from 'react';

import { withAuthorization } from "../Session";
import MaintenanceForm from "./maintenance-form"

// import "../styles/home.scss"


const HomePage = () => (
  <div>
    <h1 className="home-wrapper">Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <MaintenanceForm />
  </div>
);

const condition = authUser => authUser != null;

export default withAuthorization(condition)(HomePage);
