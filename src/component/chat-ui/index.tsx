import { AiOutlineClose, AiOutlineMore, AiOutlineRobot, AiOutlineSend } from "react-icons/ai";
import moment from "moment";
import { IoShareOutline } from "react-icons/io5";
import { BiMessageSquareError } from "react-icons/bi";
import { MdOutlineReport } from "react-icons/md";
import { webSocket } from "../../utils";
import { MessageProps, removeUser, setMessages, useChatSelector } from "../../redux/app";
import { useAppDispatch } from "../../redux";
import { useEffect, useState } from "react";

export const ChatUser = () => {
     const [typedMessage, setTypedMessage] = useState<string>("");
     const { user, messages } = useChatSelector();
     const dispatch = useAppDispatch();

     useEffect(() => {
          webSocket.on("useChatData", (state: { roomId: string; messages: MessageProps[]; _id: string }) => {
               state?.messages?.map((element: MessageProps) => {
                    return dispatch(setMessages(element));
               });
          });
          return () => {
               webSocket.off();
          };
     }, [dispatch]);

     const sendMessageToBot = () => {
          webSocket.emit("useBot", typedMessage);
          setTypedMessage("");
     };

     return (
          <div className="overflow-y-scroll w-full shadow-2xl h-full relative z-50 bg-white">
               <div className="bg-gradient-to-tr from-primary-500 via-indigo-500 to-indigo-500 m-2 px-3 py-4 flex items-center justify-between shadow-xl fixed top-0 w-[99%] rounded-xl">
                    <p className="text-white capitalize">Connected with +91 {user}</p>
                    <div className="flex items-center gap-3">
                         <button className="text-white bg-primary-400 hover:bg-primary-600 p-2 rounded-xl">
                              <MdOutlineReport size={25} />
                         </button>
                         <button
                              onClick={() => dispatch(removeUser())}
                              className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-xl"
                         >
                              <AiOutlineClose size={25} />
                         </button>
                    </div>
               </div>
               <div className="flex flex-col overflow-y-scroll p-4 mt-20 mb-20">
                    {user?.length !== 0 && (
                         <div className=" w-full">
                              <div className="flex flex-col gap-3 justify-center w-full">
                                   {messages?.map(({ body, msgOn, userType }, i) => {
                                        const isBot = userType === "BOT";
                                        const isAgent = userType === "AGENT";
                                        const isUser = userType === "USER";
                                        const isSystem = userType === "SYSTEM";
                                        return (
                                             <div key={i}>
                                                  {isSystem && (
                                                       <div className="flex justify-center">
                                                            <p
                                                                 key={i}
                                                                 className="text-center  px-5 py-2 text-xs rounded-lg capitalize bg-gray-300 font-semibold"
                                                            >
                                                                 {body}
                                                                 {"\n"}
                                                                 <span className="font-monster">
                                                                      {moment(msgOn).fromNow()}
                                                                 </span>
                                                            </p>
                                                       </div>
                                                  )}
                                                  {isUser && (
                                                       <div
                                                            key={i}
                                                            className="flex mt-2 space-x-3 max-w-xs ml-auto justify-end w-full"
                                                       >
                                                            <div className=" w-full">
                                                                 <div className="bg-primary-500 text-white p-3 rounded-l-lg rounded-br-lg">
                                                                      <p className="text-xs">{userType}</p>
                                                                      <p className="text-md">{body}</p>
                                                                 </div>
                                                                 <p className="pt-2 pl-2 text-right  text-gray-500 leading-none text-xs">
                                                                      {moment(msgOn).format("hh:mm A")}
                                                                 </p>
                                                            </div>
                                                       </div>
                                                  )}
                                                  {isAgent && (
                                                       <div
                                                            key={i}
                                                            className="flex mt-2 space-x-3 max-w-xs mr-auto justify-start w-full"
                                                       >
                                                            <div className=" w-full">
                                                                 <div className="bg-gray-100 text-gray-900 p-3 rounded-r-lg rounded-br-lg">
                                                                      <p className="text-xs">{userType}</p>
                                                                      <p className="text-md">{body}</p>
                                                                 </div>
                                                                 <p className="text-sm pt-2 pl-2 text-right  text-primary-500 leading-none">
                                                                      {moment(msgOn).format("hh:mm A")}
                                                                 </p>
                                                            </div>
                                                            <button>
                                                                 <AiOutlineMore size={22} />
                                                            </button>
                                                       </div>
                                                  )}
                                                  {isBot && (
                                                       <div
                                                            key={i}
                                                            className="flex mt-2 space-x-3 max-w-xs mr-auto justify-start w-full"
                                                       >
                                                            <div className=" w-full">
                                                                 <div className="bg-gray-100  p-3 rounded-r-lg rounded-br-lg">
                                                                      <p className="text-xs">{userType}</p>
                                                                      <div className="text-md">
                                                                           {body === "ANSWER_NOT_EXIST" ? (
                                                                                <div className="flex mt-2 space-x-3 max-w-xs w-full">
                                                                                     <div className="">
                                                                                          <div className="bg-gray-200 p-3  rounded-r-lg rounded-br-lg">
                                                                                               <p className="text-xs">
                                                                                                    user name
                                                                                               </p>
                                                                                               <div className="text-md">
                                                                                                    <div className="">
                                                                                                         <p>
                                                                                                              You know i
                                                                                                              am a robot
                                                                                                              & my
                                                                                                              response
                                                                                                              has been
                                                                                                              limited
                                                                                                              for now!
                                                                                                              so do you
                                                                                                              want to
                                                                                                              connect
                                                                                                              with our
                                                                                                              support
                                                                                                              agent?
                                                                                                         </p>
                                                                                                         <div className="flex gap-5 py-3 items-center">
                                                                                                              <button className="bg-primary-500 text-white px-3 py-1 rounded-md">
                                                                                                                   Yes
                                                                                                              </button>
                                                                                                              <button>
                                                                                                                   No!
                                                                                                                   continue
                                                                                                                   with
                                                                                                                   bot
                                                                                                              </button>
                                                                                                         </div>
                                                                                                    </div>
                                                                                               </div>
                                                                                          </div>
                                                                                          <p className="text-xs pt-2 pr-2 text-left text-gray-500 leading-none">
                                                                                               {moment(
                                                                                                    new Date().toISOString()
                                                                                               ).format("hh:mm A")}
                                                                                          </p>
                                                                                     </div>
                                                                                </div>
                                                                           ) : (
                                                                                body
                                                                           )}
                                                                      </div>
                                                                 </div>
                                                                 <p className="pt-2 pl-2 text-right  text-gray-500 leading-none text-xs">
                                                                      {moment(msgOn).format("hh:mm A")}
                                                                 </p>
                                                            </div>
                                                       </div>
                                                  )}
                                             </div>
                                        );
                                   })}
                              </div>
                         </div>
                    )}

                    {user?.length === 0 && (
                         <div className="h-[50%]  my-20 py-20 flex-col font-monster flex items-center justify-center">
                              <BiMessageSquareError size={150} className="text-gray-500" />
                              <h6 className="text-3xl font-semibold capitalize text-gray-500">
                                   Start messaging by asking question
                              </h6>
                              <p className="text-gray-500 whitespace-pre text-center mt-5">
                                   Lorem ipsum dolor sit, amet consectetur adipisicing elit. A quod aliquid reiciendis{" "}
                                   {`\n`} impedit obcaecati blanditiis cum nemo laudantium maiores expedita.
                              </p>
                         </div>
                    )}
               </div>
               <div className="fixed bottom-2 shadow-xl border left-2 w-[99%] z-50 rounded-xl bg-primary-500 flex items-center">
                    <input
                         type="text"
                         value={typedMessage}
                         onChange={(e) => setTypedMessage(e.target.value)}
                         placeholder="Ask something"
                         className="py-3 border border-transparent focus:outline-none px-5 w-full"
                    />
                    <div className="flex items-center">
                         <button className="p-3 text-white">
                              <AiOutlineSend size={25} />
                         </button>
                         <button onClick={sendMessageToBot} className="p-3 text-white">
                              <AiOutlineRobot size={25} />
                         </button>
                         <button className="p-3">
                              <IoShareOutline size={25} className="text-white" />
                         </button>
                    </div>
               </div>
          </div>
     );
};
