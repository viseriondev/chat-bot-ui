import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface WrapperProps {
     children: ReactNode;
}

export const Wrapper: FC<WrapperProps> = ({ children }) => {
     return (
          <Provider store={store}>
               <ToastContainer position="bottom-center" autoClose={3000} />
               <BrowserRouter>{children}</BrowserRouter>
          </Provider>
     );
};
