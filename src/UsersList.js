import React from 'react';

export default class UsersList extends React.Component {

    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    // Getting users data using API when component is loading
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: "GET"
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("Response data ===>>> ", responseData);
                this.setState({ // whenever state update, component rerender
                    users: responseData
                })
            });
    }

    render() {
        return <div>
            <table border="1">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                {
                    this.state.users.map((user, index) => {
                        return <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td> <a href="#">Edit</a> | <a href="#">Delete</a> </td>
                        </tr>
                    })
                }
            </table>
        </div>
    }
}