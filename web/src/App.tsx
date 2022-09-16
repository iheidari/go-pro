import { useState } from "react";
import api from "./api";
import FilesList from "./components/FilesList";
import Form from "./components/Form";
import Video from "./components/Video";

function App() {
  const [files, setFiles] = useState([]);

  const [selectedVideo, setSelectedVideo] = useState<string | undefined>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const path = (event.target as any)["path"].value;
    // no empty path
    if (!path) {
      return;
    }
    try {
      const response = await api.get(`/file?path=${path}`);
      setFiles(response.data);
    } catch (error) {
      console.error("Retrieving the videos failed.");
      console.error(error);
    }
  };

  const onVideoSelected = (file: string) => {
    setSelectedVideo(file);
  };

  return (
    <div className="container mx-auto px-4 mb-5">
      <Form onSubmit={handleSubmit} />
      <div className="flex flex-row gap-2">
        <FilesList {...{ files, selectedVideo, onVideoSelected }} />
        <Video selectedVideo={selectedVideo} />
      </div>
    </div>
  );
}

export default App;
