import { Formik } from "formik";
import React, { FC } from "react";
import { PanelInitialValues, PanelValidationSchema } from "../../validation";

interface JoinUserProps {
     joinChatRoom: ({ mobile }: { mobile: string }) => void;
     loading: boolean;
}

export const JoinUser: FC<JoinUserProps> = ({ joinChatRoom, loading }) => {
     return (
          <div className="h-full w-full flex justify-center items-center">
               <div className="xl:w-[30%] md:w-[60%] border p-3 flex flex-col gap-3 relative shadow-lg bg-white rounded-lg">
                    <div>
                         <h6 className="text-2xl font-semibold font-monster mb-3">Black Pearl Support</h6>
                         <p className="text-gray-500">
                              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est praesentium reprehenderit
                              laborum tempore illo fugit earum enim suscipit saepe voluptate.
                         </p>
                    </div>
                    <Formik
                         onSubmit={joinChatRoom}
                         initialValues={PanelInitialValues}
                         validationSchema={PanelValidationSchema}
                    >
                         {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
                              <form onSubmit={handleSubmit}>
                                   <div className="flex flex-col gap-5">
                                        <div>
                                             <label htmlFor="mobile">Mobile Number</label>
                                             <input
                                                  id="mobile"
                                                  name="mobile"
                                                  value={values.mobile}
                                                  onChange={handleChange("mobile")}
                                                  onBlur={handleBlur("mobile")}
                                                  type="number"
                                                  className="w-full border px-4 py-2 rounded-lg"
                                                  placeholder="8669026894"
                                             />
                                        </div>
                                        <p className="text-rose-500 text-xs text-right uppercase">
                                             {touched.mobile && errors.mobile}
                                        </p>
                                        <button
                                             disabled={loading}
                                             type="submit"
                                             className="rounded-lg disabled:bg-gray-300 py-2 text-white bg-primary-500 w-full"
                                        >
                                             Start now
                                        </button>
                                   </div>
                              </form>
                         )}
                    </Formik>
               </div>
          </div>
     );
};
