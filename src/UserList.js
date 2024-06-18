import React from 'react';

export default class UserList extends React.Component() {

    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: "GET"
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log("Response ===>>> ", responseData);
            this.setState({ // whenever state update, component rerender
                users: responseData
            })
        });
    }

    render() {
        return <div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                {this.state.users.map(user => {
                    return <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>
                })}
            </table>
        </div>
    }
}