import React, { useEffect, useState } from "react";
import * as user from "services/user";

import Table from "components/Table";
import UpdateUserInfo from "screens/Auth/UpdateUserInfo";
import "constants/Animations.css";

const Users = () => {
  const [users, setUsers] = useState(false);
  const [userSelected, setUserSelected] = useState(false);

  useEffect(() => {
    document.title = "Usuarios";
    const getUsers = async () => {
      const usersData = await user.getUsers();
      setUsers(usersData.users);
    };
    getUsers();
  }, [userSelected]);

  const handleRowClick = user => {
    setUserSelected(user);
  };

  const handleGoBack = () => {
    setUserSelected(false);
  };

  return (
    <div>
      {userSelected ? (
        <UpdateUserInfo user={userSelected} goBack={handleGoBack} />
      ) : (
        <>
          <h1>Usuarios</h1>
          <Table users={users} handleRowClick={handleRowClick} />
        </>
      )}
    </div>
  );
};

export default Users;
