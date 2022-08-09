import { useState } from "react";
import Files from "./components/Files";
import Video from "./components/Video";

function App() {
  const [path, setPath] = useState<string>("");
  const [previewFile, setPreviewFile] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setPath(e.target["path"].value);
  };

  const handlePreview = (file: string) => {
    setPreviewFile(`http://localhost:3001${file}`);
  };

  return (
    <div className="container mx-auto px-4 bg-sky-300">
      <form onSubmit={handleSubmit}>
        <input name="path" />
        <input type="submit" value="Submit" />
      </form>
      <Files path={path} onPreview={handlePreview} />
      <Video previewFile={previewFile} />
    </div>
  );
}

export default App;
