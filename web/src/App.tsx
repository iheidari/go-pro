import { useEffect, useReducer, useState } from "react";
import appReducer from "./App.reducer";
import Files from "./components/Files";
import Form from "./components/Form";
import Video from "./components/Video";
import { ICuts } from "./components/Video/Cuts";
import api from "./api";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    videoCuts: {},
    error: "",
  });

  useEffect(() => {
    const saveCuts = async (file: string, cuts: ICuts[]) => {
      await api.post(`/video/cuts`, { file, cuts });
    };
    if (state.selectedVideoFile && state.videoCuts[state.selectedVideoFile])
      saveCuts(
        state.selectedVideoFile,
        state.videoCuts[state.selectedVideoFile]
      );
  }, [state.videoCuts]);

  useEffect(() => {
    const getCuts = async (file: string) => {
      const response = await api.get(`/video/cuts?file=${file}`);
      if (response.status === 200) {
        dispatch({ type: "setCuts", payload: { file, cuts: response.data } });
      }
    };
    if (state.selectedVideoFile) getCuts(state.selectedVideoFile);
  }, [state.selectedVideoFile]);

  const [files, setFiles] = useState([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const path = (event.target as any)["path"].value;

    const response = await api.get(`/file?path=${path}`);
    setFiles(response.data);
  };

  return (
    <div className="container mx-auto px-4">
      <Form onSubmit={handleSubmit} />
      <div className="flex flex-row">
        <Files files={files} state={state} dispatch={dispatch} />
        <Video state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
