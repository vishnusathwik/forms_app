import React, { useContext, useEffect, useState, useCallback } from "react";
import { GlobalState } from "../../../config/contextAPI";
import { getDataFromDatabase } from "../../../config/firebase";
import { NewFormButton } from "./NewFormButton";
import { Form } from "./Form";
import { Response } from "./Response";

export default function Home() {
  const [userForms, setUserForms] = useState([]);
  const { state } = useContext(GlobalState);

  const fetchUserData = useCallback(async () => {
    const { forms } = await getDataFromDatabase(`users/${state.uid}`);
    if (forms) {
      const data = [];
      // MEMBUAT OBJECT MENJADI ARRAY
      Object.keys(forms).map((key) => {
        const form = { ...forms[key], id: key };
        return data.push(form);
      });
      setUserForms(data);
    } else {
      setUserForms([]);
    }
  }, [state.uid]);
  useEffect(() => {
    state.uid && fetchUserData();
    return () => setUserForms([]);
  }, [state.uid, fetchUserData]);

  return (
    <section style={{ minHeight: "90vh" }} className="relative ">
      <div className="w-11/12 lg:w-2/3 py-3 space-y-6 mx-auto">
        <h6
          className={`${
            !state.isDark ? "text-gray-700" : "text-gray-100"
          } font-semibold text-lg `}
        >
          Latest Form
        </h6>
        {!userForms.length ? (
          <div className="text-center bg-white shadow-md py-8 rounded-md space-y-2">
            <h6 className="text-gray-500 font-semibold text-lg">
            No form yet
            </h6>
            <p className="text-gray-400">Click + to create a new form</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userForms.map((form) => (
              <Form key={form.id} form={form} fetchUserData={fetchUserData} />
            ))}
          </div>
        )}
        <div className="overflow-x-auto py-3">
          <Response />
        </div>
      </div>
      <NewFormButton />
    </section>
  );
}
