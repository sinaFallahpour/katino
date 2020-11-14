import React from "react";
import { useParams } from "react-router-dom";
import { Employee, Employer } from "../components/register";

export function Register(prop) {
  const { role } = useParams();
  if (role === "Employee") {
    return <Employee prop={prop} />;
  } else {
    return <Employer prop={prop} />;
  }
}
