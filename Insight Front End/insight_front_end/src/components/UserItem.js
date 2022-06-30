import React, { Fragment, useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "../api/axios";
import UserContext from "../context/users/userContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const UserItem = ({ user }) => {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  // const [role, setRole]=useState('');
  const navigate=useNavigate();
  const handleClose = () => setShow(false);

  useEffect(()=>{
      setUserId(user._id)
      setName(user.name)
      // if(user.role=="admin"){
      //   setRole("Admin")
      // }
      // else {
      //   setRole("Normal User")
      // }
      // setDefaultData({name:user.name});
  },[user._id])

  const handleShow = (id) => {
    setShow(true);
    console.log(userId);
    // console.log(defaultData);
  };

  const userContext = useContext(UserContext);

  const {editUser}=userContext;

  const [success, setSuccessMessage] = useState("");
  const [error, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    setErrorMessage(" ");
    if (error) {
      setErrorMessage("* " + error + " *");
    }
    try {
      editUser(data,userId ,navigate);
      // reset();
    } catch (err) {
      setErrorMessage("* Failed to update user details*");
    }
    setShow(false);
  };

  return (
    <Fragment>
      <>
        {/*............................ Modal part................... */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="col-form-label">Name:</label>
                <input
                  type="text"
                  value={name}
                  className={`form-control`}
                  {...register("name", {
                    required: "Name is Required",
                  })}
                  onKeyUp={() => {
                    trigger("name");
                  }}
                />
                {errors.name && (
                  <small className="text-danger">{errors.name.message}</small>
                )}
              </div>
              <br />
              <div className="form-group">
                <label className="col-form-label">SELECT USER</label>
                <select
                  
                  {...register("userType", {
                    required: "User type is required",
                  })}
                  className={`form-control`}
                >
                  <option value=""> SELECT OPTION</option>
                  <option value="admin">Admin </option>
                  <option value="user"> Normal User </option>
                </select>

                {errors.userType && (
                  <small className="text-danger">
                    {errors.userType.message}
                  </small>
                )}
              </div>
              <input
                type="submit"
                className="btn btn-primary my-3"
                value="Edit Profile"
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> */}
            {/* <Button variant="primary" onClick={handleClose}>
              Update User
            </Button> */}
          </Modal.Footer>
        </Modal>
      </>
      {/*....................... MODAL FINISH...................... */}
      <tbody>
        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <Button onClick={handleShow}>EDIT</Button>
            &nbsp; &nbsp;
            {/* <Button>DELETE</Button> */}
            {/* <i class="fas fa-edit" style={{ color: "blue" }}></i>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <i class="fas fa-trash" style={{ color: "red" }}></i> */}
          </td>
        </tr>
      </tbody>
    </Fragment>
  );
};

export default UserItem;
