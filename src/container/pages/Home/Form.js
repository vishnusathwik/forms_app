import { useState, useRef, useContext } from "react";
import documentIcon from "../../../assets/svg/document.svg";
import dotsIcon from "../../../assets/svg/verticalDots.svg";
import { Dropdown } from "./Dropdown";
import useOutsideClick from "../../../utils/useOutsideClick";
import { stringDate } from "../../../utils/stringDate";
import { limitString } from "../../../utils/limitString";
import { GlobalState } from "../../../config/contextAPI";
import { deleteDataDatabase } from "../../../config/firebase";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
export const Form = ({ form, fetchUserData }) => {
  const { state, dispatch } = useContext(GlobalState);
  const [isDropdown, setDropdown] = useState(false);
  const { push } = useHistory();

  const openForm = () => {
    push(`/${form.id}`);
    dispatch({ type: "CHANGE_ISEDIT", value: false });
  };

  const editForm = () => {
    push(`/edit/${form.id}`);
    dispatch({ type: "CHANGE_ISEDIT", value: true });
  };

  const copyToClipboard = () =>
    navigator.clipboard
      .writeText(window.location.href + form.id)
      .then(() => alert("URL copied successfully"))
      .catch((e) => alert(e));

  const showData = () => {
    dispatch({ type: "CHANGE_IDFORM", value: form.id });
  };

  const deleteForm = async () =>
    await deleteDataDatabase(`users/${state.uid}/forms/${form.id}/`)
      .then(() => fetchUserData())
      .catch((e) => console.log(e));

  const ref = useRef();
  useOutsideClick(ref, () => isDropdown && setDropdown(false));

  return (
    <div
      key={form.id}
      className="bg-white shadow rounded text-sm py-3 px-5 space-y-2 relative"
    >
      <p className="text-gray-700 font-semibold text-base">
        <Link onClick= {openForm}>{limitString(form.title.title, 20)}</Link>
      </p>
      <div className="flex items-center space-x-1">
        <img src={documentIcon} alt="form" className="h-5 w-5" />
        <span className="text-gray-500">
        Updated {stringDate(form.date)}
        </span>
      </div>
      <div
        ref={ref}
        onClick={() => setDropdown(!isDropdown)}
        className="hover:bg-gray-100 absolute right-1 top-1 p-1 rounded-full duration-200 cursor-pointer"
      >
        <img src={dotsIcon} alt="dots" className="h-5 w-5" />
        <Dropdown
          id={form.id}
          isDropdown={isDropdown}
          openForm={openForm}
          editForm={editForm}
          copyToClipboard={copyToClipboard}
          showData={showData}
          deleteForm={deleteForm}
        />
      </div>
    </div>
  );
};
