import React, { Component, useContext } from 'react';

class DummyForm extends Component {
  constructor(props) {
      super(props)


      this.state = {
          currentMileage: '',
          dueBy: null,
      }
  }

  // componentDidMount() {
  //     // console.log(this.props.firebase.auth.currentUser.uid)
  //     // userid = this.props.firebase.auth.currentUser.uid
  //     // console.log(userid)
  //     this.setState({ loading : true })
  //     this.props.firebase.user("97e6LrEDx0MBliQ76FoWTbgM3MW2").on('value', snap => {
  //         // console.log(snap.val())
  //         const myData = snap.val()
  //         this.setState({
  //             currentMileage: myData.mileage
  //         })
  //         console.log(myData.mileage)
  //     })
  // }

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
      <div className="signin-wrapper">
        <form onSubmit={this.onSubmit}>
            <div className='landing-form-wrapper'>
                <h1>Enter in current mileage after an oil change, and I'll keep track of when its due!</h1>
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
      </div> 
    );

  }
}



 
// export default withFirebase(MaintenanceForm);
export default DummyForm;
