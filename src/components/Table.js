import React from "react";
import Datatable, { createTheme } from "react-data-table-component";
import { Bounce } from "react-activity";
import "react-activity/dist/react-activity.css";

import InputContainer from "../ui/InputContainer";
import Theme from "../constants/Theme";
import { ThemedLink } from "../ui/Links";

const Table = props => {
  const { users, handleRowClick } = props;
  const columns = [
    {
      name: "Nombre",
      selector: "username",
      sortable: "true"
    },
    { name: "Correo", selector: "email", sortable: "true" },
    { name: "Rol", selector: "role", sortable: "true" }
  ];

  createTheme("solarized", {
    text: {
      primary: Theme.darkerText,
      secondary: Theme.contrast
    },
    background: {
      default: Theme.background
    },
    context: {
      background: "#000",
      text: "#000"
    },
    button: {
      default: Theme.contrast
    },
    divider: {
      default: Theme.surface
    },
    action: {
      button: Theme.contrast,
      hover: Theme.contrast,
      disabled: "rgba(0,0,0,.12)"
    },
    highlightOnHover: {
      default: Theme.surface,
      text: Theme.text
    }
  });

  const customStyles = {
    headCells: {
      style: {
        color: Theme.contrast,
        fontSize: 14
      }
    }
  };

  if (!users) {
    return <Bounce />;
  }
  return (
    <>
      <InputContainer style={{ margin: "20px auto" }}>
        <h2>
          <ThemedLink to="/dashboard/users/newUser">Crear usuario</ThemedLink>
        </h2>
      </InputContainer>
      <Datatable
        title="Usuarios"
        data={users}
        columns={columns}
        noHeader
        pagination
        theme="solarized"
        customStyles={customStyles}
        highlightOnHover
        onRowClicked={row => handleRowClick(row)}
      />
    </>
  );
};

export default Table;
