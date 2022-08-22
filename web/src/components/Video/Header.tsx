import React from "react";

type Props = {
  autoPlay?: boolean;
  onAutoPlayChange: (event: React.FormEvent<HTMLInputElement>) => void;
};

const Header = ({ autoPlay, onAutoPlayChange }: Props) => {
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
