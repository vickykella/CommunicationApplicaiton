import React from 'react';
import NavBar from './NavBar';
import Nav from './Nav';

export default class Welcome extends React.Component {

    constructor() {
        super();
        this.state = {
            user: null,
            redirect: false
        }
    }

    // Fetching the data from localStorage initially to display the user info
    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem("user"));
        this.setState({user: user});
    }

    render() {
        return <>
            <div>
                <h4>Login Successful</h4>
                Welcome user - {this.state.user && this.state.user.email}
            </div>
        </> 
    }
}