import * as React from "react";
import { SHOW_VIDEO, CLOSE_VIDEO } from "../actions/Actions";

interface RootState {
    videoPath?: string;
};

interface Action {
    type: string,
    payload?: any
};

const initialState: RootState = {};

type StoreContextType = {
    state: RootState,
    dispatch: React.Dispatch<Action>
};

export const StoreContext = React.createContext<StoreContextType>(null);

export const Store: React.FunctionComponent = ({ children }) => {
    const [state, dispatch] = React.useReducer((state: RootState, action: Action) => {
        switch (action.type) {
            case SHOW_VIDEO:
                return { ...state, videoPath: `${process.env.SERVER_URI}/video/${action.payload}` };
            case CLOSE_VIDEO:
                return { ...state, videoPath: null };
        }

        return state;
    }, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};