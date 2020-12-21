import React, { useEffect, useState } from "react";
import axios from "axios";
import API_ADDRESS from "../../../API_ADDRESS";
import { EmployerDetails } from "./EmployerDetails/EmployerDetails";
import { EmployerDetailsContainer } from "./EmployerProfile.style";
import { MiniSpinner } from "../../../components/spinner/MiniSpinner";

const EmployerProfile = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, Setloading] = useState(false);

  useEffect(() => {
    Setloading(true);
    axios.get(API_ADDRESS + "Account/LoadEmployerProfile").then(({ data }) => {
      setCompanies({
        ManagmentFullName: data.resul.managmentFullName || "",
        PersianFullName: data.resul.persianFullName || "",
        EngFullName: data.resul.engFullName || "",
        EmergencPhone: data.resul.emergencPhone || "",
        Image: data.resul.image || "",
        url: data.resul.url || "",
        FieldOfActivity:
          data.resul.fieldOfActivity?.map((item) => {
            return {
              value: item.id,
              label: item.name,
            };
          }) || "",
        NumberOfStaff: data.resul.numberOfStaff || 0,
        Email: data.resul.email || "",
        City: parseInt(data.resul.cities) || "",
        ShortDescription: data.resul.shortDescription || "",
      });
      Setloading(false);
    });
  }, []);

  return (
    <>
      {loading && <MiniSpinner />}
      <section className="companies container-fluid spx-2 spx-lg-10 smt-10 spt-3 mb-0">
        {companies && !loading ? (
          <EmployerDetails companies={companies} />
        ) : (
          <EmployerDetailsContainer>
            اطلاعاتی دریافت نشد
          </EmployerDetailsContainer>
        )}
      </section>
    </>
  );
};

export { EmployerProfile };
