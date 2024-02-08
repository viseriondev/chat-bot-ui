import { Route, Routes } from "react-router-dom";
import { Wrapper } from "./wapper";
import { HomeScreen } from "./pages";

export default function App() {
     return (
          <Wrapper>
               <Routes>
                    <Route path="/" element={<HomeScreen />} />
               </Routes>
          </Wrapper>
     );
}
