import { useState } from "react";
import Files from "./components/Files";

function App() {
  const [path, setPath] = useState<string>("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setPath(e.target["path"].value);
  };
  return (
    <div className="container mx-auto px-4 bg-sky-300">
      <form onSubmit={handleSubmit}>
        <input name="path" />
        <input type="submit" value="Submit" />
      </form>
      {path && <Files path={path} />}
      <video controls width="650">
        <source
          src="http://localhost:3001/file/GH010351.MP4"
          type="video/mp4"
        />
        Sorry, your browser doesn't support embedded videos.
      </video>
    </div>
  );
}

export default App;
