import React, { useState } from "react";
import Files from "./components/Files";
import Form from "./components/Form";
import Video from "./components/Video";

function App() {
  const [path, setPath] = useState<string>("");
  const [previewFile, setPreviewFile] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPath((event.target as any)["path"].value);
  };

  const handlePreview = (file: string) => {
    setPreviewFile(`${process.env.REACT_APP_API_BASE_URL}${file}`);
  };

  return (
    <div className="container mx-auto px-4">
      <Form onSubmit={handleSubmit} />
      <div className="flex flex-row">
        <Files path={path} onPreview={handlePreview} />
        <Video previewFile={previewFile} />
      </div>
    </div>
  );
}

export default App;
