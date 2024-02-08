import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { RemoveID, SetID } from "../../utils";

export interface MessageProps {
     body: string;
     msgOn: Date;
     userType: string;
}

export interface ChatSliceProps {
     user: string | null;
     messages: MessageProps[];
     messageInput: string;
}

const initialState: ChatSliceProps = {
     messages: [],
     user: null,
     messageInput: "",
};

const ChatSlice = createSlice({
     initialState,
     name: "chat",
     reducers: {
          setMessages: (state, action: PayloadAction<MessageProps>) => {
               state.messages.push(action.payload);
          },
          setUser: (state, action: PayloadAction<string>) => {
               state.user = action.payload;
               SetID(state.user);
          },
          removeUser: (state) => {
               state.user = null;
               RemoveID();
          },
          handleMessageInput: (state, action: PayloadAction<string>) => {
               console.log(action.payload);
               state.messageInput = action.payload;
          },
     },
});

export const useChatSelector = () =>
     useAppSelector((state) => {
          return state.chat;
     });
export const ChatReducer = ChatSlice.reducer;
export const { removeUser, setMessages, setUser, handleMessageInput } = ChatSlice.actions;
