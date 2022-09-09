import { useState } from "react";
import FilesList from "./components/FilesList";
import Form from "./components/Form";
import Video from "./components/Video";

function App() {
  const [path, setPath] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<string | undefined>();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPath((event.target as any)["path"].value);
  };
  const onVideoSelected = (file: string) => {
    setSelectedVideo(file);
  };

  return (
    <div className="container mx-auto px-4 mb-5">
      <Form onSubmit={handleSubmit} />
      <div className="flex flex-row gap-2">
        <FilesList {...{ path, selectedVideo, onVideoSelected }} />
        <Video selectedVideo={selectedVideo} />
      </div>
    </div>
  );
}

export default App;
