import { useContext, useState } from "react";
import { AppContext } from "../../context/appContext";
import { anyActiveTask } from "../../util/tasks";
import Bell from "../Icons/Bell";
import BellRinging from "../Icons/BellRinging";
import Popup from "./Popup";

type Props = {};

const Notification = (props: Props) => {
  const context = useContext(AppContext);
  const [showPopup, setShowPopup] = useState(false);
  if (context && anyActiveTask(context.tasks)) {
    return (
      <div
        className="w-6 h-6 z-10 cursor-pointer"
        onClick={() => setShowPopup((value) => !value)}
      >
        <BellRinging />
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
