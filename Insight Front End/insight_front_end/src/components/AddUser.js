import React, { useState, Fragment, useContext } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/users/userContext";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const userContext = useContext(UserContext);
  const { addUser, error, loading } = userContext;
  const onSubmit = (data) => {
    setErrorMessage("");
    if (error) {
      setErrorMessage("* " + error + " *");
    }
    try {
      addUser(data, navigate);
      // reset();
    } catch (err) {
      setErrorMessage("* USER WITH THAT EMAIL ALREADY EXIST *");
    }
    // console.log(data);
  };

  return (
    <Fragment>
      <Container>
        <h1 className="large text-primary">ADD USER</h1>
        {errorMessage && <p className="text-danger"> {errorMessage} </p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="col-form-label">Name:</label>
            <input
              type="text"
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
          <div className="form-group">
            <label className="col-form-label">Email:</label>
            <input
              type="text"
              className={`form-control`}
              {...register("email", {
                required: "Email is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              onKeyUp={() => {
                trigger("email");
              }}
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>{" "}
          <br />
          <div className="form-group">
            <label className="col-form-label">SELECT USER</label>
            <select
              {...register("userType", {
                required: "User type is required",
              })}
              className={`form-control`}
            >
              <option value="admin">Admin </option>
              <option value="user"> Normal User </option>
            </select>

            {errors.userType && (
              <small className="text-danger">{errors.userType.message}</small>
            )}
          </div>
          <input
            type="submit"
            className="btn btn-primary my-3"
            value="ADD USER"
          />
        </form>
      </Container>
    </Fragment>
  );
};

export default AddUser;
