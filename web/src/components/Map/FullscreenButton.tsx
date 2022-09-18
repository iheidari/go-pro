import ExitFullscreen from "../Icons/ExitFullscreen";
import Fullscreen from "../Icons/Fullscreen";

type Props = { isFullscreen: boolean; onClick: () => void };

const FullscreenButton = ({ isFullscreen, onClick }: Props) => {
  return (
    <div className="leaflet-top leaflet-right">
      <div
        className="leaflet-control leaflet-bar w-8 h-8 bg-white"
        onClick={onClick}
      >
        {isFullscreen ? <ExitFullscreen /> : <Fullscreen />}
      </div>
    </div>
  );
};

export default FullscreenButton;
