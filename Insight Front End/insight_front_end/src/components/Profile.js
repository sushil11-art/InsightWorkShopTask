import React, { useContext, useEffect } from "react";
import UserContext from "../context/users/userContext";

const Profile = () => {
  const userContext = useContext(UserContext);
  const { viewProfile, profile } = userContext;
  useEffect(() => {
    viewProfile();
  }, []);
  if (
    Object.keys(profile).length !== 0
   
  ) {
    return (
      <div>
        <h1>Name:{profile.name}</h1>
        <h1>Email:{profile.email}</h1>
        <h1>Role: {profile.role}</h1>
      </div>
    );
  } else {
    return <div>Failed to fetch profile details</div>;
  }
};

export default Profile;
