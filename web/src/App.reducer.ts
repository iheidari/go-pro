import { ICuts } from "./components/Video/Cuts";

interface IVideoCuts {
  [file: string]: ICuts[];
}

export interface IAppState {
  videoCuts: IVideoCuts;
  error: string;
  selectedVideoFile?: string;
}

export type IAppActions =
  | {
      type: "setCuts";
      payload: { file: string; cuts: ICuts[] };
    }
  | {
      type: "startCut";
      payload: { file: string; start: number; duration: number };
    }
  | { type: "endCut"; payload: { file: string; end: number } }
  | { type: "deleteCut"; payload: { file: string } }
  | { type: "selectVideo"; payload: { file: string } };

export type IAppDispatch = (state: IAppState, action: IAppActions) => IAppState;

const appReducer = (state: IAppState, action: IAppActions): IAppState => {
  switch (action.type) {
    case "setCuts": {
      const { file, cuts } = action.payload;

      return { ...state, videoCuts: { ...state.videoCuts, [file]: cuts } };
    }
    case "startCut": {
      const { file, start, duration } = action.payload;
      const cuts = state.videoCuts[file] || [];
      //   // first cut
      if (cuts.length === 0) {
        return {
          ...state,
          error: "",
          videoCuts: {
            ...state.videoCuts,
            [action.payload.file]: [{ start, end: duration }],
          },
        };
      }

      // no end specificed, over write the start
      if (cuts[cuts.length - 1].end !== duration) {
        // start is before last cut's end(over lap)
        if (start < cuts[cuts.length - 1].end) {
          return {
            ...state,
            error: "Bad Start time",
          };
        }
        return {
          ...state,
          error: "",
          videoCuts: {
            ...state.videoCuts,
            [action.payload.file]: [...cuts, { start, end: duration }],
          },
        };
      }
      if (
        cuts[cuts.length - 1].end === duration &&
        cuts.length > 1 &&
        start < cuts[cuts.length - 2].end
      ) {
        return {
          ...state,
          error: "Bad Start time",
        };
      }
      const newCuts = [...cuts];
      newCuts[newCuts.length - 1].start = start;
      return {
        ...state,
        error: "",
        videoCuts: { ...state.videoCuts, [action.payload.file]: newCuts },
      };
    }
    case "endCut": {
      const { file, end } = action.payload;
      const cuts = state.videoCuts[file] || [];

      if (cuts.length === 0) {
        return {
          ...state,
          error: "",
          videoCuts: {
            ...state.videoCuts,
            [action.payload.file]: [{ start: 0, end }],
          },
        };
      }
      const newCuts = [...cuts];
      newCuts[newCuts.length - 1].end = end;
      return {
        ...state,
        error: "",
        videoCuts: { ...state.videoCuts, [action.payload.file]: newCuts },
      };
    }
    case "deleteCut": {
      const { file } = action.payload;
      const cuts = state.videoCuts[file] || [];
      if (cuts.length > 0) {
        const newCuts = cuts.filter(
          (c, index, all) => index !== all.length - 1
        );
        return {
          ...state,
          error: "",
          videoCuts: { ...state.videoCuts, [action.payload.file]: newCuts },
        };
      }
      return state;
    }
    case "selectVideo": {
      return {
        ...state,
        selectedVideoFile: action.payload.file,
      };
    }
    default:
      throw new Error();
  }
};

export default appReducer;
