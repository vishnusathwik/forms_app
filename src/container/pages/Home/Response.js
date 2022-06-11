import React, { useEffect, useContext, useState } from "react";
import { GlobalState } from "../../../config/contextAPI";
import { getDataFromDatabase } from "../../../config/firebase";

export const Response = () => {
  const { state, dispatch } = useContext(GlobalState);
  const [response, setResponse] = useState([]);

  const id = state.idForm;
  const uidURLLastIndex = id.indexOf("&&id=");
  const uidURL = id.substring(4, uidURLLastIndex);

  useEffect(() => {
    const getData = async () => {
      dispatch({ type: "CHANGE_ISLOADING", value: true });
      try {
        const res = await getDataFromDatabase(`users/${uidURL}/forms/${id}`);
        dispatch({ type: "CHANGE_TITLEFORM", value: res.title });
        dispatch({ type: "CHANGE_CONTENTFORM", value: res.contentForms });
        const datas = [];
        // MEMBUAT OBJECT MENJADI ARRAY
        Object.keys(res.response).map((key) => {
          return datas.push(res.response[key]);
        });
        setResponse(datas);
      } catch (e) {
        console.error("no data");
      } finally {
        dispatch({ type: "CHANGE_ISLOADING", value: false });
      }
    };
    getData();
    return () => {
      dispatch({ type: "CHANGE_TITLEFORM", value: { title: "", desc: "" } });
      dispatch({ type: "CHANGE_CONTENTFORM", value: [] });
      setResponse([]);
    };
  }, [dispatch, id, uidURL]);

  return (
    state.idForm && (
      <table
        className={`${
          state.isDark ? "text-gray-700" : "text-gray-500"
        } bg-white rounded-md shadow-md`}
      >
        <thead>
          <tr className="border-b-2 border-gray-300 text-left">
            {state.contentForms
              .sort((a, b) => a.id - b.id)
              .map((el, index) => (
                <th
                  key={index}
                  className="px-6 font-semibold"
                  style={{ height: "40px" }}
                >
                  {el.title}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {response.map((el, index) => (
            <tr key={index} className="border-b text-left">
              {el
                .sort((a, b) => a.id - b.id)
                .map((input, idx) => (
                  <td key={idx} className="px-6" style={{ height: "40px" }}>
                    {input.type !== "checkbox"
                      ? input.inputs
                      : input.inputs.join(",")}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};
