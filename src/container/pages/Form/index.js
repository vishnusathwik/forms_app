import React, { useContext, useEffect } from "react";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { GlobalState } from "../../../config/contextAPI";
import {
  getDataFromDatabase,
  postDataToDatabase,
  setDataToDatabase,
} from "../../../config/firebase";
import Question from "./Question";
import TitleForm from "./TitleForm";
import { getDate } from "../../../utils/getDate";

export default function Form() {
  const { id } = useParams();
  const { push } = useHistory();
  const { pathname } = useLocation();
  const { state, dispatch } = useContext(GlobalState);

  const indexPathnameStart = pathname.indexOf("uid=") + 4;
  const indexPathnameEnd = pathname.indexOf("&&id=");
  const uidURL = pathname.substring(indexPathnameStart, indexPathnameEnd);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (state.contentForms.length === state.inputs.length) {
      dispatch({ type: "CHANGE_ISLOADING", value: false });
      try {
        await postDataToDatabase(
          `/users/${uidURL}/forms/${id}/response/`,
          state.inputs
        );
        alert("The data you have entered has been successfully recorded");
        push("/");
      } catch (e) {
        alert(e);
      } finally {
        dispatch({ type: "CHANGE_ISLOADING", value: false });
      }
    } else {
      alert("there can be nothing empty");
    }
  };

  const handleEditForm = async (e) => {
    e.preventDefault();
    if (state.titleForm.title) {
      // title isnt empty
      if (state.contentForms.length !== 0) {
        // form isnt empty
        dispatch({ type: "CHANGE_ISLOADING", value: true });
        const form = {
          title: state.titleForm,
          contentForms: state.contentForms,
          date: getDate(),
        };
        await setDataToDatabase(`/users/${state.uid}/forms/${id}/`, form)
          .then(() => push("/"))
          .catch((e) => alert(e))
          .finally(() => dispatch({ type: "CHANGE_ISLOADING", value: false }));
      } else {
        alert("form cannot be empty");
      }
    } else {
      alert("form title cannot be blank");
    }
  };

  useEffect(() => {
    const getData = async () => {
      dispatch({ type: "CHANGE_ISLOADING", value: true });
      try {
        const res = await getDataFromDatabase(`users/${uidURL}/forms/${id}/`);
        dispatch({ type: "CHANGE_TITLEFORM", value: res.title });
        dispatch({ type: "CHANGE_COLOR", value: res.color });
        dispatch({ type: "CHANGE_CONTENTFORM", value: res.contentForms });
      } catch (e) {
        console.error("data tidak ada");
      } finally {
        dispatch({ type: "CHANGE_ISLOADING", value: false });
      }
    };
    getData();
    return () => {
      dispatch({ type: "CHANGE_TITLEFORM", value: { title: "", desc: "" } });
      dispatch({ type: "CHANGE_COLOR", value: "purple" });
      dispatch({ type: "CHANGE_CONTENTFORM", value: [] });
      dispatch({ type: "CHANGE_INPUTS", value: [] });
    };
  }, [dispatch, id, uidURL]);

  useEffect(() => {
    pathname.substring(1, 5) === "edit"
      ? dispatch({ type: "CHANGE_ISEDIT", value: true })
      : dispatch({ type: "CHANGE_ISEDIT", value: false });

    return () => dispatch({ type: "CHANGE_ISEDIT", value: true });
  }, [dispatch, pathname]);

  const isAdmin = () => {
    if (pathname.substring(1, 5) === "edit") {
      if (state.uid === uidURL) {
        return true;
      }
      return false;
    }
    return true;
  };

  return !isAdmin() ? (
    <Redirect to="/" />
  ) : (
    <section>
      <form
        onSubmit={(e) =>
          state.isEdit ? handleEditForm(e) : handleSubmitForm(e)
        }
        className="w-11/12 lg:w-1/2 py-5 space-y-4 mx-auto"
      >
        <TitleForm />
        <AnimatePresence>
          {state.contentForms &&
            state.contentForms.map((el) => <Question key={el.id} id={el.id} />)}
        </AnimatePresence>
        <div className="flex justify-end py-3">
          <AnimatePresence>
            {!state.isAnimateSubmitButton && (
              <motion.button
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                type="submit"
                className={`text-gray-500 tracking-wide bg-white shadow rounded-md py-2 px-5 ${
                  state.isDark ? "light-shadow bg-gray-100" : "shadow"
                }`}
              >
                SUBMIT
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </form>
    </section>
  );
}

const variants = {
  initial: { x: 150 },
  animate: {
    x: 0,
    transition: {
      ease: "easeOut",
      type: "spring",
      stiffness: 70,
      duration: 0.3,
    },
  },
  exit: { x: 150 },
};
