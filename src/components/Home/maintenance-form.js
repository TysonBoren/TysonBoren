import React, { Component, useContext } from 'react';
import { withFirebase } from "../Firebase/index";
import Firebase from "../Firebase";
import { withAuthentication } from "../Session";
import { withAuthorization } from "../Session";
import { AuthUserContext } from "../Session";




// const {authUser}  = useContext
class MaintenanceForm extends Component {
    constructor(props) {
        super(props)


        this.state = {
            loading: false,
            currentMileage: '',
            dueBy: 1,
            currentUser: "testuser1@email.com",
        }
    }

    componentDidMount() {
        // console.log(this.props.firebase.auth.currentUser.uid)
        // userid = this.props.firebase.auth.currentUser.uid
        // console.log(userid)
        this.setState({ loading : true })
        this.props.firebase.user("97e6LrEDx0MBliQ76FoWTbgM3MW2").on('value', snap => {
            // console.log(snap.val())
            const myData = snap.val()
            this.setState({
                currentMileage: myData.mileage
            })
            console.log(myData.mileage)
        })
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
                    {/* {this.state.currentMileage} */}
                </div>
                <div>
                    {/* {this.state.dueBy} */}
                </div>
            </form>
        );

    }
}



 
// export default withFirebase(MaintenanceForm);
const condition = authUser => authUser != null;

export default withAuthorization(condition)(MaintenanceForm);
