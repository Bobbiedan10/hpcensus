import classes from "./tabs.module.css";
import { useState } from "react";
import EnumeratorForm from "../forms/enumerator-form";
import SupervisorForm from "../forms/supervisor-form";
import SeniorForm from "../forms/senior-form";

function Tabs(props) {
  const { seniors, supes } = props;
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div>
      <ul className={"dark:bg-blue-500 bg-blue-50 " + classes.tabs}>
        <li
          className={`hover:bg-pink-600 ${
            toggleState === 1 ? `${classes.active} bg-pink-600` : ""
          }`}
          onClick={() => toggleTab(1)}>
          Enumerator
        </li>
        <li
          className={`hover:bg-orange-600${
            toggleState === 2 ? `${classes.active} bg-orange-600` : ""
          }`}
          onClick={() => toggleTab(2)}>
          Supervisor
        </li>
        <li
          className={`hover:bg-yellow-500${
            toggleState === 3 ? `${classes.active} bg-yellow-500` : ""
          }`}
          onClick={() => toggleTab(3)}>
          Senior
        </li>
      </ul>
      <div>
        <div
          className={
            toggleState === 1
              ? `${classes.active_content}`
              : `${classes.content}`
          }>
          <EnumeratorForm seniors={seniors} supes={supes} />
        </div>
        <div
          className={
            toggleState === 2
              ? `${classes.active_content}`
              : `${classes.content}`
          }>
          <SupervisorForm seniors={seniors} />
        </div>
        <div
          className={
            toggleState === 3
              ? `${classes.active_content}`
              : `${classes.content}`
          }>
          <SeniorForm />
        </div>
      </div>
    </div>
  );
}

export default Tabs;
