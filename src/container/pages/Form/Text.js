import { useContext, useState } from "react";
import { GlobalState } from "../../../config/contextAPI";
import { QuestionContext } from "./Question";

export const Text = () => {
  const { state, dispatch } = useContext(GlobalState);
  const [text, setText] = useState("");
  const id = useContext(QuestionContext);
  const inputs = state.inputs;
  const index = inputs.findIndex((el) => el.id === id);

  const handleChange = (e) => {
    setText(e.target.value);
    if (index === -1) {
      // id not found
      if (inputs.length === 0) {
        // because of array is empty
        dispatch({
          type: "CHANGE_INPUTS",
          value: [{ id, type: "text", inputs: e.target.value }],
        });
      } else {
        // array isnt empty but id doesnt exist
        dispatch({
          type: "CHANGE_INPUTS",
          value: [...inputs, { id, type: "text", inputs: e.target.value }],
        });
      }
    } else {
      // id found
      inputs[index] = { ...inputs[index], inputs: e.target.value };
      dispatch({
        type: "CHANGE_INPUTS",
        value: [...inputs],
      });
    }
  };

  return (
    <input
      onChange={(e) => handleChange(e)}
      value={text}
      //disabled={state.isEdit}
      placeholder="Short answer text"
      className={`${
        state.isDark
          ? "bg-gray-100 hover:border-gray-300 border-gray-100"
          : "bg-white hover:border-gray-300 border-white"
      } border-b focus:border-b-2 focus:border-purple-700 w-full py-2`}
    />
  );
};
