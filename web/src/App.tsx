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

  const [path, setPath] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPath((event.target as any)["path"].value);
  };

  return (
    <div className="container mx-auto px-4">
      <Form onSubmit={handleSubmit} />
      <div className="flex flex-row">
        <Files path={path} state={state} dispatch={dispatch} />
        <Video state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
