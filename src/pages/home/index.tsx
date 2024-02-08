import React, { useEffect, useState } from "react";
import { Layout } from "../../layout";
import { MessageProps, setMessages, setUser, useChatSelector } from "../../redux/app";
import { useAppDispatch } from "../../redux";
import { ChatUser, JoinUser } from "../../component";
import { toast } from "react-toastify";
import { webSocket } from "../../utils";

export const HomeScreen = () => {
     const dispatch = useAppDispatch();
     const { user } = useChatSelector();
     const [loading, setLoading] = useState<boolean>(false);

     useEffect(() => {
          if (user?.length) {
               webSocket.on("useChatData", (state: any) => {
                    dispatch(setMessages(state.messages));
               });
          }
          return () => {
               webSocket.off();
          };
     }, [user, dispatch]);

     const handleLoading = (element: boolean) => {
          setLoading(element);
     };

     const JoinRoom = ({ mobile }: { mobile: string }) => {
          handleLoading(true);
          if (!mobile) {
               toast.error("please enter mobile number");
          }
          webSocket.emit("userConnected", mobile.toString());
          webSocket.on("useChatData", (state: { roomId: string; messages: MessageProps[]; _id: string }) => {
               dispatch(setUser(state.roomId));
               state.messages.map((element: MessageProps) => {
                    return dispatch(setMessages(element));
               });
          });
          handleLoading(false);
     };

     return <Layout>{!user ? <JoinUser joinChatRoom={JoinRoom} loading={loading} /> : <ChatUser />}</Layout>;
};
