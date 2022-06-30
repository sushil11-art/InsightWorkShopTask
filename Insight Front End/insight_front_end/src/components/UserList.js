import React, { Fragment, useContext, useEffect } from "react";
import UserContext from "../context/users/userContext";
import UserItem from "./UserItem";
import { Container, Table } from "react-bootstrap";

const UserList = () => {
  const userContext = useContext(UserContext);

  const { fetchAllUsers, users, loading} = userContext;
  useEffect(() => {
    fetchAllUsers();
  }, []);


  return !loading && users.length==0 ? (
    <div> No list of users availabe please add one</div>
  ) : (
    <Fragment>
      <h1> LIST OF USERS ARE HERE</h1>
      <Container>
        <Table striped bordered hover variant="warning">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          {users.length > 0 &&
            users.map((user) => (
              <UserItem user={user} key={user._id}/>
            ))}
        </Table>
      </Container>
    </Fragment>
  );
};

export default UserList;
