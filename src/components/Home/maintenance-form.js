import React, { Component } from 'react';
import { withAuthorization } from "../Session";


class MaintenanceForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentMileage: 0,
            dueBy: 1
        }
    }

    
    onChange = event => {
        this.setState({
            currentMileage: event.target.value
        })


    }

    onSubmit = (event) => {

        this.setState({
            dueBy: 3700 + parseFloat(this.state.currentMileage)
        })

        event.preventDefault(event)

    }
    
    
    render() {
        return ( 
            <form onSubmit={this.onSubmit}>
                <div>
                    <h1>Enter in current mileage and I'll remind you when you are due!</h1>
                    <input
                        name="currentMileage"
                        type="float"
                        placeholder="mileage"
                        onChange={this.onChange}
                    >

                    </input>
                    <button type="submit">submit</button>
                </div>
                <div>
                    {this.state.currentMileage}
                </div>
                <div>
                    {this.state.dueBy}
                </div>
            </form>
        );

    }
}

const condition = authUser => authUser != null;

 
export default withAuthorization(condition)(MaintenanceForm);