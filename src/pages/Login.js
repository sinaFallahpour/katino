import React from "react";
import { useParams } from "react-router-dom";
import { Employee, Employer } from "../components/login";

export function Login(prop) {
  const { role } = useParams();
  if (role === "Employee") {
    return <Employee prop={prop} />;
  } else {
    return <Employer prop={prop} />;
  }
}
