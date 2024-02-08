import React, { FC } from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface ProgressBarProps {}

export const ProgressBar: FC<ProgressBarProps> = () => {
     return (
          <div className="h-full flex justify-center items-center">
               <AiOutlineLoading className="animate-spin text-primary-500" size={100} />
          </div>
     );
};
