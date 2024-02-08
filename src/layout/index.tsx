import { FC, ReactNode } from "react";

interface LayoutProps {
     children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
     return (
          <div className="w-screen h-screen flex justify-center items-center flex-col relative bg-gradient-to-tr from-gray-50 to-primary-50">
               {children}
          </div>
     );
};
