import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import AuthContext from "../context/auth/authContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const navigate= useNavigate();
  const authContext = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const { registerAdmin, isAuthenticated, error } = authContext;
  // console.log(error);
  const onSubmit = (data) => {

    setErrorMessage('')
    if(error) {
      setErrorMessage("* " + error + " *")
    }

    try {
      registerAdmin(data, navigate);
      // reset();
    } catch (err) {
      setErrorMessage("* That User Already Exists *") 
    }
  };
  return (
    <Fragment>
      <Container>
        <h1 className="large text-primary">Sign Up As Admin</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>

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
          </div>

          <input
            type="submit"
            className="btn btn-primary my-3"
            value="Register Admin"
          />
        </form>

        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Container>
    </Fragment>
  );
};

export default Register;
