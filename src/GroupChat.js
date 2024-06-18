import React from 'react';
import './CSS/Chat.css';
import axios from 'axios';

export default class GroupChat extends React.Component {

    constructor() {
        super();
        this.state = {
            messages: [],
            username: "",
            message: ""
        }
    }

    // Calling getMessage while loading the component
    componentDidMount() {
        this.getMessages();
        this.setState({ username: JSON.parse(sessionStorage.getItem("user")).fullname });
    }

    // Fetches data from API
    getMessages = () => {
        fetch('http://localhost:4200/messages/getMessages', {
            method: "GET"
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log("fetch method response", responseData);
            this.setState({messages: responseData});
        });
    }

    // Saves data and fetches data from API using Axios and reset message textbox
    sendMessage = () => {
        axios.post('http://localhost:4200/messages/saveMessage', {"name": this.state.username,  "message": this.state.message})
        .then((responseData) => {
            console.log("fetch method response", responseData);
            this.setState({ message: "" });
            this.getMessages();
        });
    }

    render() {
        return <>
            <div class="chat-container"> 
                <div class="message-container"> 
                    { this.state.messages.map(message => {
                        return <div className={this.state.username != message.name ? "message sender-message" : "message receiver-message"}> 
                            <img src="https://www.svgrepo.com/show/532362/user.svg" alt="Receiver Avatar" class="avatar" /> 
                            {message.message} 
                        </div> })
                    }
                </div> 
        
                <div class="message"> 
                    <input type="text" value={this.state.message}
                        placeholder="Type your message..." onChange={e => this.setState({message: e.target.value})} /> 
                    <button onClick={this.sendMessage}>Send</button> 
                </div> 
            </div>
        </>
    }
}