import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ChatBot = createApi({
     baseQuery: fetchBaseQuery({
          baseUrl: "http://localhost:8080",
     }),
     reducerPath: "botApi",
     endpoints: ({ mutation }) => ({
          sendMessage: mutation<any, string>({
               query: (message) => {
                    return {
                         url: "/use-bot",
                         method: "POST",
                         body: {
                              question: message,
                         },
                    };
               },
          }),
     }),
});

export const ChatBotReducer = ChatBot.reducer;
export const ChatBotMiddleware = ChatBot.middleware;
export const { useSendMessageMutation } = ChatBot;
