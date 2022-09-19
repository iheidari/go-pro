import { useState } from "react";
import FilesList from "./components/FilesList";
import Form from "./components/Form";
import Notification from "./components/Notification/Notification";
import Video from "./components/Video";
import { AppContextProvider } from "./context/appContext";

function App() {
  const [selectedVideo, setSelectedVideo] = useState<string | undefined>();
  const onVideoSelected = (file: string) => {
    setSelectedVideo(file);
  };

  return (
    <AppContextProvider>
      <div className="container mx-auto px-4 mb-5">
        <header className="flex flex-row justify-between items-center">
          <Form />
          <Notification />
        </header>
        <div className="flex flex-row gap-2">
          <FilesList {...{ selectedVideo, onVideoSelected }} />
          <Video selectedVideo={selectedVideo} />
        </div>
      </div>
    </AppContextProvider>
  );
}

export default App;
