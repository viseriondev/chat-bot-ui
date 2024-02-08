import { Middleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ChatBotMiddleware, ChatBotReducer, ChatReducer } from "./app";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthReducer } from "./features";

const appMiddleware: Middleware[] = [ChatBotMiddleware];

export const store = configureStore({
     reducer: combineReducers({
          chat: ChatReducer,
          botApi: ChatBotReducer,
          auth: AuthReducer,
     }),
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
setupListeners(store.dispatch);
