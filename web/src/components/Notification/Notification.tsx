import { useContext, useState } from "react";
import { AppContext } from "../../context/appContext";
import { anyActiveTask } from "../../util/tasks";
import Bell from "../Icons/Bell";
import BellRinging from "../Icons/BellRinging";
import Popup from "./Popup";

const Notification = () => {
  const context = useContext(AppContext);
  const [showPopup, setShowPopup] = useState(false);
  if (context) {
    return (
      <div
        className="w-6 h-6 z-10 cursor-pointer"
        onClick={() => setShowPopup((value) => !value)}
      >
        {anyActiveTask(context.tasks) ? <BellRinging /> : <Bell />}
        {showPopup && <Popup tasks={context.tasks} />}
      </div>
    );
  }
  return (
    <div className="w-6 h-6" title="no notification">
      <Bell />
    </div>
  );
};

export default Notification;
