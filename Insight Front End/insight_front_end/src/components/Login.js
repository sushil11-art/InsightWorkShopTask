import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import AuthContext from "../context/auth/authContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const { isAuthenticated, error, loginUser } = authContext;
  const onSubmit = (data) => {
    setErrorMessage("");
    if (error) {
      setErrorMessage("* " + error + " *");
    }
    try {
      loginUser(data, navigate);
      // reset();
    } catch (err) {
      setErrorMessage("* Invalid credentials *");
    }
  };
  return (
    <Fragment>
      <Container>
        <h1 className="large text-primary">Login USER</h1>
        {errorMessage && <p className="text-danger"> {errorMessage} </p>}

        <form onSubmit={handleSubmit(onSubmit)}>
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

          <input type="submit" className="btn btn-primary my-3" value="Login" />
        </form>

        <p className="my-1">
          Dont have an account? <Link to="/register">Register</Link>
        </p>
      </Container>
    </Fragment>
  );
};

export default Login;
