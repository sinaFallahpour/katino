import React from "react";
import { useParams, Redirect } from "react-router-dom";
import { Employee, Employer } from "../components/login";
import auth from "../core/authService";

export function Login(prop) {
  const { role } = useParams();
  if (auth.getCurrentUser()) {
    return <Redirect to="/" />;
  }

  if (role === "Employee") {
    return (
      <>
        <Employee prop={prop} />
      </>
    );
  } else {
    return (
      <>
        <Employer prop={prop} />
      </>
    );
  }
}
