import React, { Component } from "react";
import PropTypes from 'prop-types';
import '../css/User.css';

//User Class Use to store props for User.
class User extends Component {
    constructor(props) {
        super(props);
        this.IdContent = React.createRef();
        this.state = {
            id: "Unknown User", //To access this props use "this.state.id"
            editMode: false,
            LoggingStatus: false
        }
    }

    //Edit User when already log in.
    handleEdit() {
        this.setState({
            editMode: true
        });
    }

    //Enter new value for User when log in.
    handleSave() {
        this.setState({
            id: this.IdContent.current.value,
            editMode: false,
            LoggingStatus: true
        });
        localStorage.setItem('userId', this.IdContent.current.value);
        // calls the "refreshPage" method with will refresh the page and display the inputted information on parent components
        // this.refreshPage(); //Disable
    }

    handleLogout() {
        this.setState({
            id: "Unknown User",
            editMode: false,
            LoggingStatus: false,
            
        });
        localStorage.removeItem('userId');
    }
    // refreshes the page
    refreshPage() {
        window.location.reload(false);
    }

    //Render login area for User to enter their id.
    render() {
        let welcomeElement,idElement, buttonArea;
        if (this.state.editMode && this.state.LoggingStatus) {
            //User Log in and enable edit mode
            idElement = <textarea ref={this.IdContent} className="title-textarea nav-center" defaultValue={this.state.id} placeholder="Enter Your New ID"></textarea>;
            buttonArea = <div className="buttom-even">
                <button className="btn btn-info" onClick={this.handleSave.bind(this)}>Save</button>
                <button className="btn btn-info margin-r5" onClick={this.handleLogout.bind(this)}>Log Out</button></div>;
        } else if (!this.state.editMode &&this.state.LoggingStatus) { 
            //User log in and not enable edit mode
            welcomeElement = <h2 className="body-textarea">Hello {this.state.id} !</h2>
            buttonArea = <div className="buttom-even">
            <button className="btn btn-info" onClick={this.handleEdit.bind(this)}>Edit</button>
            <button className="btn btn-info margin-r5" onClick={this.handleLogout.bind(this)}>Log Out</button></div>;
        } else {
            //User Logged out or have not log in and have not enable edit mode.
            idElement = <textarea ref={this.IdContent} className="title-textarea" placeholder="Enter Your ID"></textarea>;
            buttonArea = <div className="button-right"><button className="btn btn-info margin-r5" onClick={this.handleSave.bind(this)}>Login</button></div>;
        }
        return (
            <div className="col-sm-6">
                <div className="card card-view">
                    <div className="card-body">
                        {welcomeElement}
                        {idElement}
                        {buttonArea}
                    </div>
                </div>
            </div>
        );
    }
}

User.propTypes = {
    id: PropTypes.string // To make sure id is a string.
}

export default User;