import React from 'react';
import './CSS/Login.css';
import { Navigate } from 'react-router-dom';
import Welcome from './Welcome';
import Nav from './Nav';
import LandingPage from './LandingPage';

export default class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            redirect: false,
            currentUser: null,
            back: false
        }
    }

    submitLogin = (e) => {
        e.preventDefault();
        if(this.state.username === "" || this.state.password === "") {
            alert("USERNAME AND PASSWORD ARE EMPTY");
        } else {
            let users = localStorage.getItem("users") == null ? [] : JSON.parse(localStorage.getItem("users"));
            if(users.length == 0) {
                alert("No users present with the provided credentials");
            } else {
                users.forEach(user => {
                    if(user.email == this.state.username && user.password == this.state.password) {
                        sessionStorage.setItem("user", JSON.stringify(user));
                        this.setState({ redirect: true });
                    }
                })
            }
        }
    }

    handleChange = (e, from) => {
        e.preventDefault();
        let stateValues = this.state;
        if(from == "username") {
            stateValues.username = e.target.value;
        } else {
            stateValues.password = e.target.value;
        }
        this.setState(stateValues);
    }

    render() {
        return <>
            { this.state.redirect && <><Nav /></> }
            {this.state.back && <LandingPage />}
            { !this.state.redirect && 
                <div style={{paddingTop: "10%", paddingLeft: "25%", width: "70%"}}>
                <h3>Enter your login credentials</h3>
                    <form action="#" onSubmit={e => this.submitLogin(e)}>
                        <label htmlFor="first"> Email: </label>
                        <input type="text" id="first" name="first" 
                            placeholder="Enter your Email" 
                            value={this.state.username} 
                            onChange={e => this.handleChange(e, "username")}
                        /><br />

                        <label htmlFor="password"> Password: </label>
                        <input type="password" id="password" name="password" 
                            placeholder="Enter your Password" 
                            value={this.state.password} 
                            onChange={e => this.handleChange(e, "password")}
                        /><br />

                        <div className="wrap">
                            <button type="submit"> Submit </button>    &nbsp;&nbsp;&nbsp;&nbsp;
                            {/* <button type="submit" onClick={() => this.setState({ back: true })}> Back </button> */}
                        </div>
                    </form>
                </div>
            }
        </>
    }
}