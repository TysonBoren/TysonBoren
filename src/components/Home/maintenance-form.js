import React, { Component, useContext } from 'react';
import { withAuthorization } from "../Session";
import Button from '@material-ui/core/Button';
import firebase from "../Firebase"




// const {authUser}  = useContext
class MaintenanceForm extends Component {
    userRef;
    dueByRef;
    constructor(props) {
        super(props)


        this.state = {
            currentMileage: '',
            dueBy: null,
            currentUser: this.props.firebase.auth.currentUser.email,
        }
        console.log("props", props)
    }
    
    componentDidMount() {
        // console.log(this.props.firebase.auth.currentUser.uid)
        // userid = this.props.firebase.auth.currentUser.uid
        // console.log(userid)
        this.userRef = this.props.firebase.user(this.props.firebase.auth.currentUser.uid);
        this.userRef.on('value', snap => {
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
            currentMileage: event.target.value,
            // dueBy: 3700 + parseFloat(this.state.currentMileage)
        })
    }

            


// currently works but is SETTING data children rather than updating. Running out of time so this will do for now. Fix later. 
    // onSubmit = (event) => {
    //     this.props.firebase.user(this.props.firebase.auth.currentUser.uid);
    //     this.userRef.once('value', snap => {
    //         const newData = snap.val()
    //         console.log(newData)
    //         this.userRef.update({
    //             mileage: this.state.currentMileage,
    //         })
    //         .then(() => {
    //             this.setState({
    //                 dueBy: 3700 + parseFloat(this.state.currentMileage)
    //             })
    //         })
    //         .then(() => {
    //            this.dueByRef = this.props.firebase.user(this.props.firebase.auth.currentUser.uid)
    //             this.userRef.once("value", snap => {
    //                 const newData = snap.val()
    //                 this.userRef.set({
    //                     mileage: this.state.currentMileage,
    //                     email: newData.email,
    //                     make: newData.make,
    //                     model: newData.model,
    //                     username: newData.username,
    //                     year: newData.year,
    //                     dueByMileage: this.state.dueBy
    //                 })
    //             })
    //         })
    //         .then(() => {
    //             this.setState({
    //                 dueBy: this.props.firebase.auth.currentUser.dueByMileage
    //             })
    //         })
    //         .catch(error => {
    //             console.log("error", error)
    //         })
    //     })
    //     event.preventDefault(event)
    // }



    // THIS TOTALLY WORKS DONT MESS IT UP!!
    onSubmit = (event) => {
        this.props.firebase.user(this.props.firebase.auth.currentUser.uid);
        this.userRef.once('value', snap => {
            const newData = snap.val()
            console.log(newData)
            this.userRef.update({
                mileage: this.state.currentMileage,
                // email: newData.email,
                // make: newData.make,
                // model: newData.model,
                // username: newData.username,
                // year: newData.year,
            })
            .then(() => {
                this.setState({
                    dueBy: 3700 + parseFloat(this.state.currentMileage)
    
                })
            })
            .catch(error => {
                console.log("error", error)
            })
        })
        event.preventDefault(event)
    }
    
    render() {
        return ( 
            <form onSubmit={this.onSubmit}>
                <div>
                    <h1>Enter in current mileage after an oil change, and I'll keep track of when its due!</h1>
                    <input
                        name="currentMileage"
                        type="float"
                        placeholder="mileage"
                        onChange={this.onChange}
                    >

                    </input>
                    <Button type="submit" variant="contained" color="primary">
                        Get yo mileage!
                    </Button>
                    {/* <button type="submit">submit</button> */}
                </div>
                <div>
                    <h4>this was your mileage at last oilchange!</h4>
                    {this.state.currentMileage}
                </div>
                <div>
                    <h4>Oil change due by mile:</h4>
                    {this.state.dueBy}
                </div>
            </form>
        );

    }
}



 
// export default withFirebase(MaintenanceForm);
const condition = authUser => authUser != null;

export default withAuthorization(condition)(MaintenanceForm);
