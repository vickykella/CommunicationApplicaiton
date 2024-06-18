import React from 'react';
import { Card } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

export default class LandingPage extends React.Component {

    constructor() {
        super();
        this.state = {
            login: false,
            register: false
        }
    }

    // Updates the flag value based on the button action
    updateFlag = (e) => {
        e.preventDefault();
        console.log(e.target.name);
        if(e.target.name === "login") {
            this.setState({ login: true });
        } else {
            this.setState({ register: true });
        }
    }

    render() {
        return <div>
            { this.state.login && <Login /> }
            {/* { this.state.login && <Navigate replace={true} to='/login' />} */}
            { this.state.register && <Register /> }
            { !(this.state.login || this.state.register) &&
                <div style={{paddingTop: "10%", paddingLeft: "25%", width: "70%"}}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Welcome to users module</Card.Title>
                            <Card.Text>
                                <div>
                                    <p>Existing Users</p>
                                    <button name="login" onClick={this.updateFlag}>Login</button>
                                </div><br />
                                <div>
                                    <p>New Users</p>
                                    <button name="register" onClick={this.updateFlag}>Register</button>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            }
        </div>
    }

}