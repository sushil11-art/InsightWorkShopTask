import React, { useState, Fragment, useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/users/userContext";

const EditProfile = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const userContext = useContext(UserContext);
  const { viewProfile, editProfile, profile, error } = userContext;
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    viewProfile();
  }, []);

  useEffect(() => {
    setName(profile.name);
  }, [profile]);

  // const {profile} = usesrContext;

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    setErrorMessage(" ");
    if (error) {
      setErrorMessage("* " + error + " *");
    }
    try {
      console.log("this block fired");
      editProfile(data, navigate);
      // reset();
    } catch (err) {
      setErrorMessage("* USER WITH THAT EMAIL ALREADY EXIST *");
    }
    // console.log(data);
  };

  if (Object.keys(profile).length !== 0) {
    return (
      <Fragment>
        <Container>
          <h1 className="large text-primary">EDIT PROFILE</h1>
          {errorMessage && <p className="text-danger"> {errorMessage} </p>}

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
            <input
              type="submit"
              className="btn btn-primary my-3"
              value="Edit Profile"
            />
          </form>
        </Container>
      </Fragment>
    );
  } else {
    return <div>Profile details loading please wait...</div>;
  }
};

export default EditProfile;
