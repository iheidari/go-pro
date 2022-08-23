import { useReducer, useState } from "react";
import appReducer from "./App.reducer";
import Files from "./components/Files";
import Form from "./components/Form";
import Video from "./components/Video";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    videoCuts: {},
    error: "",
  });

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
