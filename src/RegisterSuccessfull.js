import React from 'react';

export default class RegisterSuccessfull extends React.Component {

    constructor() {
        super();
        this.state = {
            
        }
    }

    render() {
        return <div>
            <h4>Registration Successful</h4><br />

            <p>Thank you for registration</p>

            <a href="/">Click to return to home page</a>
        </div>
    }
}