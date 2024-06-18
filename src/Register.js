import React from 'react';
import RegisterSuccessfull from './RegisterSuccessfull';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {
                fullname: "",
                email: "",
                password: "",
                confirmpassword: "",
                redirect: false
            }
        };
    }

    // Handling changes done on fields and updating the states
    changeHandler = (event) => {
        let name = event.target.name; // username, password, email
        let value = event.target.value; // username value, password value, email value
        let errors = this.state.errors;
        console.log(name);
        console.log(value);

        switch (name) {
            case "fullname":
                errors.fullname = value.length < 5 ? 'fullname must be 5 characters in length' : "";
                break;

            case "email":
                errors.email = value.length < 5 ? 'Email must be 5 characters in length' : "";
                break;

            case "password":
                errors.password = value.length < 5 ? 'Password must be 5 characters in length' : "";
                break;

            case "confirmpassword":
                errors.confirmpassword = value.length < 5 ? 'Password must be 5 characters in length' : "";
                break;
        }
        console.log(errors);
        this.setState({ errors, [name]: value }); // update state, whenever state update, component rerender
    }

    // Submitting the data
    handleSubmit = (event) => {
        event.preventDefault();
        let stateValues = this.state;
        if(stateValues.fullname !== "" && stateValues.email !== "" && stateValues.password !== "" && stateValues.confirmpassword !== "") {
            if(localStorage.getItem("users") == null) {
                let users = [];
                users.push({ "fullname": this.state.fullname, "email": this.state.email, "password": this.state.password, "confirmpassword": this.state.confirmpassword });
                localStorage.setItem("users", JSON.stringify(users));
            } else {
                let users = JSON.parse(localStorage.getItem("users"));
                users.push({ "fullname": this.state.fullname, "email": this.state.email, "password": this.state.password, "confirmpassword": this.state.confirmpassword });
                localStorage.setItem("users", JSON.stringify(users));
            }
            this.setState({ redirect: true });
        } else {
            alert("Please enter all fields data");
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <>{ this.state.redirect && <RegisterSuccessfull /> }
            { !this.state.redirect && <>
            <h3>Register Form Validation</h3>
            <form className='col-xxl-6' onSubmit={this.handleSubmit}>
                Enter Fullname: <input type='text' name="fullname" className='form-control' placeholder='Enter fullname' onChange={this.changeHandler} />
                <p className='error-message'>{errors.fullname}</p>

                Enter Email: <input type='text' name="email" className='form-control' placeholder='Enter email' onChange={this.changeHandler} />
                <p className='error-message'>{errors.email}</p>

                Enter Password: <input type='password' name="password" className='form-control' placeholder='Enter password' onChange={this.changeHandler} />
                <p className='error-message'>{errors.password}</p>

                Enter Password: <input type='password' name="confirmpassword" className='form-control' placeholder='Enter confirm password' onChange={this.changeHandler} />
                <p className='error-message'>{errors.confirmpassword}</p>

                <input className='btn btn-outline-secondary m-2' type='submit' value="Register" />

            </form></>}
        </>);
    }
}