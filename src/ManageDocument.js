import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const ManageDocument = () => {

    const[files, setFiles] = useState([]);
    const[modalId, setModalId] = useState(null);
    const[showDeleteDialog, setDeleteDialog] = useState(false);

    // Fetching documents data initially
    useEffect(() => {
        getFilesData();
    }, [])

    // Fetching the data from localStorage and updating the state values
    const getFilesData = () => {
        let files = JSON.parse(localStorage.getItem("files"));
        setFiles(files);
    }

    const setNewFileData = () => {}

    // updating states to trigger the delete dialog to display
    const deltecurrentFile = (index) => {
        setModalId(index);
        setDeleteDialog(true);
    }

    // Deleting the files based on index
    const deleteFile = () => {
        let files = JSON.parse(localStorage.getItem("files"));
        let newFiles = files.filter((item, index) => index != modalId)
        localStorage.setItem("files", JSON.stringify(newFiles));
        getFilesData();
        setModalId(null);
        setDeleteDialog(false);
    }

    // Submitting the file
    const submitFile = () => {
        let fileData = document.getElementById("myFile").files[0];
        let files = [];
        if(JSON.parse(localStorage.getItem("files")) !== null) {
            files = JSON.parse(localStorage.getItem("files"));
            files.push({ label: fileData.name.split(".")[0], name: fileData.name, path: fileData.value });
        } else {
            files.push({ label: fileData.name.split(".")[0], name: fileData.name, path: fileData.value });
        }
        localStorage.setItem("files", JSON.stringify(files));
        getFilesData();
    }

        return (<>
            <div className="table-responsive">
                <table className='table table-striped table-border'>
                    <thead>
                        <tr>
                            <th>Label</th>
                            <th>File Name</th>
                            <th>Actions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            files && files.length > 0 && files.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.name}</td>
                                    <td>  
                                        {/* <button type="button" className="btn btn-link" onClick={() => setNewFileData(index)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Edit
                                        </button> | */}
                                        <button type="button" className="btn btn-link" onClick={() => deltecurrentFile(index)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div><br />

            <div>
                <p>Add New File</p>
                <form action="#">
                    <input type="file" id="myFile" name="filename" />
                    <Button onClick={() => submitFile()}>Submit</Button>
                </form>
            </div>

            <Modal show={showDeleteDialog} onHide={()=>setDeleteDialog(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>deleteFile()}>
                    Yes
                </Button>
                <Button variant="primary" onClick={()=>setDeleteDialog(false)}>
                    No
                </Button>
                </Modal.Footer>
            </Modal>
        </>)
}

export default ManageDocument;