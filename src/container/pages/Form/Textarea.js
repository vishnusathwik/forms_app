import { useContext, useState } from "react";
import { GlobalState } from "../../../config/contextAPI";
import { QuestionContext } from "./Question";

export const Textarea = () => {
  const { state, dispatch } = useContext(GlobalState);
  const id = useContext(QuestionContext);
  const [textarea, setTextarea] = useState("");
  const inputs = state.inputs;
  const index = inputs.findIndex((el) => el.id === id);

  const handleChange = (e) => {
    setTextarea(e.target.value);
    if (index === -1) {
      // id not found
      if (inputs.length === 0) {
        // because of array is empty
        dispatch({
          type: "CHANGE_INPUTS",
          value: [{ id, type: "textarea", inputs: e.target.value }],
        });
      } else {
        // array isnt empty but id doesnt exist
        dispatch({
          type: "CHANGE_INPUTS",
          value: [
            ...inputs,
            { id, type: "textarea", inputs: e.target.value },
          ],
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
    <textarea
      onChange={(e) => handleChange(e)}
      value={textarea}
      //disabled={state.isEdit}
      placeholder="Long answer text"
      className={`${
        state.isDark
          ? "bg-gray-100 hover:border-gray-300 border-gray-100"
          : "bg-white hover:border-gray-300 border-white"
      } border-b focus:border-b-2 focus:border-purple-700 w-full py-2 h-auto resize-none`}
    ></textarea>
  );
};
