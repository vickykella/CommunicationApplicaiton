import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ManageUsers=()=> {

    const[users, setUsers] = useState([]);
    const[modelId, setModelId] = useState(null);
    const[showModal, setShowModal] = useState(false);
    const[showEditModal, setShowEditModal] = useState(false);
    const[newUser, setNewUser] = useState({fullname: "", email: ""});
    
    // Initially calling fetchUsers function to get the users data
    useEffect(() => {
        fetchUsers();
      }, []);

    // Fetches data from localStorage and set into state
    const fetchUsers = () => {
        let userss = JSON.parse(localStorage.getItem("users"));
        setUsers(userss)
    }

    // Deleteing user based on the index
    const deleteUser = (val) => {
    
        let user = val?.filter((item,index) => index !=modelId);
        localStorage.setItem("users", JSON.stringify(user));
        setShowModal(false)
        setModelId(null);
        fetchUsers();
    }

    // Updating the state values
    const setModelIdFunction = (index) => {
        setModelId(index);
        setShowModal(true);
    }

    // Updating the data into state whenever there is a change in fields
    const onChangeNewUser = (event) => {
        let user = newUser;
        if(event.target.name == "fullname") {
            user.fullname = event.target.value;
        } else if(event.target.name == "email") {
            user.email = event.target.value;
        }
        console.log("UPDATED USER INFO ===>>> ", user);
        setNewUser(user);
    }

    // Updating the state data based on the action
    const setNewUserData = (userIndex) => {
        users.map((user, index) => {
            if(index == userIndex) {
                setNewUser(user);
                setModelId(userIndex);
            }
        });
        setShowEditModal(true);
    }

    // updating the user data
    const updateUser = () => {
        let oldUsers = users;
        oldUsers.map((user, index) => {
            if(index == modelId) {
                user.fullname = newUser.fullname;
                user.email = newUser.email;
            }
        });
        localStorage.setItem("users", JSON.stringify(oldUsers));
        fetchUsers();
        setShowEditModal(false);
    }

    return (<>
        <div className="table-responsive">
            <table className='table table-striped table-border'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((item, index) => (
                            <tr key={index}>
                                <td>{item.fullname}</td>
                                <td>{item.email}</td>
                                <td>  
                                    <button type="button" className="btn btn-link" onClick={() => setNewUserData(index)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Edit
                                    </button> |
                                    <button type="button" className="btn btn-link" onClick={() => setModelIdFunction(index)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Delete
                                    </button></td>
                                {/* <td><Star /></td> */}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

        <Modal show={showModal} onHide={()=>setShowModal(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this user - {modelId !== null && users[modelId].fullname}</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>deleteUser(users)}>
                Yes
            </Button>
            <Button variant="primary" onClick={()=>setShowModal(false)}>
                No
            </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showEditModal} onHide={()=>setShowEditModal(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form action="#">
                    <label htmlFor="first"> Full Name: </label>
                    <input type="text" id="first" name="fullname" 
                        placeholder="Enter your new full name" 
                        value={newUser ? newUser.fullname : ""} 
                        onChange={(e) => onChangeNewUser(e)}
                    /><br />
                    <label htmlFor="first"> Email: </label>
                    <input type="text" id="first" name="email" 
                        placeholder="Enter your new email" 
                        value={newUser ? newUser.email : ""} 
                        onChange={(e) => onChangeNewUser(e)}
                    /><br />

                </form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={()=>updateUser(users)}>
                Update
            </Button>
            <Button variant="secondary" onClick={()=>setShowEditModal(false)}>
                Cancel
            </Button>
            </Modal.Footer>
        </Modal>
    </>);

}
export default ManageUsers;

// export default class ManageUsers extends React.Component {

//     constructor() {
//         super();
//         this.state = {
//             users: [],
//             modelId: null,
//             showModal: false
//         }
//     }

//     componentDidMount() {
//         this.getUsers();
//     }

//     getUsers = () => {
//         let users = JSON.parse(localStorage.getItem("users"));
//         this.setState({ users });
//     }

//     deleteUser = () => {
//         let users = this.state.users.splice(this.state.modelId, 1);
//         sessionStorage.setItem("users", JSON.stringify(users));
//         this.getUsers();
//     }

//     setModelId = (index) => {
//         console.log("INDEX ===>>> ", index);
//         this.setState({ modelId: index, showModal: true })
//     }

//     render() {
//         return <>
//             <div className="table-responsive">
//                 <table className='table table-striped table-border'>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Actions</th>
//                             <th></th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             this.state.users.map((item, index) => (
//                                 <tr key={index}>
//                                     <td>{item.fullname}</td>
//                                     <td>{item.email}</td>
//                                     <td><Link to={`/edituser/${index}`}>Edit</Link> |
//                                         <button type="button" className="btn btn-link" onClick={() => this.setModelId(index)} data-bs-toggle="modal" data-bs-target="#exampleModal">
//                                             Delete
//                                         </button></td>
//                                     {/* <td><Star /></td> */}
//                                 </tr>
//                             ))
//                         }
//                     </tbody>
//                 </table>
//             </div>

//             {this.state.modelId &&
//                 <Modal show={true} onHide={this.setState({ modelId: null, showModal: false })}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Delete User</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>Are you sure. you  want to delete user - { this.state.modelId && this.state.users[this.state.modelId].fullname } </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="primary" onClick={this.deleteUser}>
//                             Yes
//                         </Button>
//                         <Button variant="primary" onClick={this.setState({ modelId: null, showModal: false })}>
//                             No
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             }
//         </>
//     }
// }