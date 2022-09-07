import React, { Dispatch } from "react";
import { IVideoActions, IVideoState } from "./reducer";

type Props = {
  state: IVideoState;
  dispatch: Dispatch<IVideoActions>;
};

const Header = ({ state, dispatch }: Props) => {
  const { autoPlay } = state;
  const onAutoPlayChange = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: "setAutoPlay",
      payload: { autoPlay: !!event.currentTarget.checked },
    });
  };
  return (
    <div className="mb-2">
      <input
        id="chkAutoPlay"
        type="checkbox"
        onChange={onAutoPlayChange}
        checked={autoPlay}
      />
      <label className="ml-2" htmlFor="chkAutoPlay">
        Auto play
      </label>
    </div>
  );
};

export default Header;
