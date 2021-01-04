import React, { useState, useEffect } from "react";
import { LanguageForm } from "./LanguageForm";

const LanguageGenerator = ({ getAllLanguageForCurrentUser, addItemToList }) => {
  const [formCount, setFormCount] = useState([{ form: 1 }]);

  const [limitFormNumber, setLimitFormNumber] = useState(1);

  const AddForm = () => {
    const index = formCount.length - 1;
    const tempo = [...formCount];
    const count = tempo[index]?.form ? tempo[index]?.form + 1 : 1;
    tempo.push({ form: count });
    const limitNumber = tempo.length;
    setLimitFormNumber(limitNumber);
    setFormCount(tempo);
  };

  const DeleteForm = (e) => {
    const formId = parseInt(e.target.id);
    let tempo = formCount.filter(({ form }) => form !== formId);
    const limitNumber = tempo.length;
    setLimitFormNumber(limitNumber);

    setFormCount(tempo);
  };

  return (
    <>
      {formCount.map(({ form }) => (
        <LanguageForm
          key={form}
          idOfForm={form}
          getAllLanguageForCurrentUser={getAllLanguageForCurrentUser}
          addItemToList={addItemToList}
          DeleteForm={DeleteForm}
        />
      ))}

      <section className="complete-register-form container-fluid col-12 ">
        <aside className=" col-12 mx-auto">
          {limitFormNumber < 5 ? (
            <button
              onClick={AddForm}
              type="submit"
              className="col-12 btn btn-success ir-r mt-2 "
              style={{
                width: "100%",
              }}
            >
              افزودن فرم جدید
            </button>
          ) : (
            <button
              className="col-12 btn btn-success-light text-gray c-gray ir-r "
              style={{
                width: "100%",
                outline: "none",
              }}
            >
              افزودن فرم جدید
            </button>
          )}
        </aside>
      </section>
    </>
  );
};

export { LanguageGenerator };
